var express = require('express');
var app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);

http.listen(3000, function(){
    console.log('listening on *:3000');
});

//路由，链接到client，访问时直接访问到index.html
app.use(express.static(__dirname + '/client'));

/*app.get('/', function (req, res){
    res.sendFile(__dirname + '/index.html');
    res.sendFile(__dirname + '/img');
});*/
   
// 在线玩家人数
var onlineCount = 0;

//在线玩家
var onlineUser = [];

//房间列表
var roomInfo = {};

var mongoose = require("../mongod/mongoose.js")

io.on('connection', function (socket){
    //当前用户信息
    var currentUserId = '';
    var currentUsername = '';
    var userPassword = '';
    var joinDate = '';
    //新用户注册
    socket.on('register user', function (data){
        
        var userData = {
            userid: data.userid,
            username: data.username,
            password: data.password,
            address: data.address,
            joindate: data.joindate,
            avator: data.useravator
        }
        //数据库验证用户名是否可使用
        mongoose.findData(userData.username,function(err,res){
            if (err) {
                console.log('查询出错：' + err);
                socket.emit('connectState', {
                    connectState: false,
                });
            } else {
                if(res.length > 0){
                    console.log('验证失败：' + res + '用户名已存在');
                    socket.emit('validUsername', {
                        validUsername: false
                    });
                }else if(res.length == 0){
                    console.log('验证成功：用户名可使用');
                    socket.emit('validUsername', {
                        validUsername: true
                    });
                    //创建用户信息
                    mongoose.creatData(userData,function(err,res){
                        if (err) {
                            console.log('添加用户出错：' + err);
                            socket.emit('connectState', {
                                connectState: false,
                            });
                        } else {
                            console.log('添加用户成功！' + res);
                            socket.emit('creatUserInfo', {
                                creatState: true,
                            });
                            //记录当前玩家名字id
                            currentUserId = userData.userid;
                            currentUsername = userData.username;
                            userPassword = userData.password;
                            joinDate = userData.joindate;
                            console.log("新用户加入\nusername : "+currentUsername+"\npassword : "+userPassword+"\njoindata : "+joinDate+"\nuserid : "+currentUserId+"");
                            onlineCount++;
                            onlineUser.push(userData.username)
                            console.log(onlineUser,onlineCount)
                        }
                    });
                }
                
            }
        });
        
        //findData(currentUsername);
        //upData(currentUsername,userPassword);
        // if(getUserPassword && getUserPassword == userPassword){
        //     console.log('登录密码正确')
        //     //检查在线列表，如果不在里面就加入
        //     if(!onlineUser.hasOwnProperty(currentUserId)) {
        //         onlineUser[currentUserId] = currentUsername;
        //         onlineCount++;
        //     }
        //     console.log(onlineUser)
        //     //向客户端返回登录情况
        //     socket.emit('loginState', {
        //         loginState: true
        //     });

        //     //向客户端返回人数
        //     socket.emit('login', {
        //         onlineCount: onlineCount,
        //         onlineUser: onlineUser
        //     });

        //     //发送信息给所有连接到server的客户端
        //     socket.broadcast.emit('user joined', {
        //         username: currentUsername,
        //         onlineCount: onlineCount,
        //         onlineUser: onlineUser
        //     });

        // }else{
        //     console.log('登录密码错误')
        //     //向客户端返回登录情况
        //     socket.emit('loginState', {
        //         loginState: false
        //     });
        // }
        
    })
    //登录
    socket.on('login', function (data){
        mongoose.findPassword(data.username, function(err, res){

            if(err){
                console.log('查询出错：' + err);
                socket.emit('connectState', {
                    connectState: false,
                });
                
            }else{
                console.log('查询结果：' + res)
                if(res.length > 0){
                    if(data.password != res[0].password){
                        socket.emit('loginState', {
                            loginState: 2,  //0 默认；1 没有账号；2 密码错误；3 登陆成功；4 未登陆；5 重复登陆
                        })
                    }else if(data.password == res[0].password){
                        if(onlineUser.indexOf(data.username) === -1){
                            socket.emit('loginState', {
                                loginState: 3,  
                            })
                            //记录当前玩家名字id
                            currentUserId = data.userid;
                            currentUsername = data.username;
                            userPassword = data.password;
                            joinDate = data.joindate;
                            console.log("新用户加入\nusername : "+currentUsername+"\npassword : "+userPassword+"\njoindata : "+joinDate+"\nuserid : "+currentUserId+"");
                            onlineCount++;
                            onlineUser.push(data.username)
                        }else if(onlineUser.indexOf(data.username) > -1){
                            socket.emit('loginState', {
                                loginState: 5,  //0 默认；1 没有账号；2 密码错误；3 登陆成功；4 未登陆； 5 重复登陆
                            })
                            console.log('用户重复登录')
                        }
                        
                        console.log(onlineUser,onlineCount)
                    }
                }else if(res.length == 0){
                    socket.emit('loginState', {
                        loginState: 1,  
                    });
                }
            }

        })

    })
    //进入房间
    socket.on('join room', function (data){
        var roomId = data.roomId;
        //房间人数
        var roomUserCount;
        var username = data.userInfo.username;
        console.log(roomId, username)

        if (!roomInfo[roomId]) {
            roomInfo[roomId] = [];
        }

        // 加入房间
        socket.join(roomId);    

        roomInfo[roomId].push(username);
        roomUserCount = roomInfo[roomId].length;
        console.log(roomInfo[roomId])
        // 通知此房间内的所有人员
        socket.broadcast.to(roomId).emit('join room broadcast', {type: 3, tip: username + '加入了房间'});  
        console.log(username + '加入了房间' + roomId);

        socket.emit('room usercount', {type: 3, tip: '当前房间共有' + roomUserCount + '人'});
        console.log('房间' + roomId + '总共有' + roomUserCount + '人');

        //用户发送信息
        socket.on('sendMsg', function (data){
            socket.broadcast.to(roomId).emit('sendMsg broadcast', {
                type: 2,    //1: 本人信息   2：其他人信息   3：提示信息
                username: data.username,
                message: data.message,
                useravator: data.useravator
            });
            console.log(data.username + ':'  + data.message);
        });
    })
    
    //存储用户信息
    socket.on('getUserInfo', function (username){
        mongoose.findData(username, function(err, res){
            if(err){
                console.log('查询出错：' + err);
                socket.emit('connectState', {
                    connectState: false,
                });
            }else{
                console.log('查询结果：' + res)
                if(res.length > 0){
                    socket.emit('saveUserInfo', {
                        username: res[0].username,
                        avator: res[0].avator,
                        address: res[0].address,
                        joindate: res[0].joindate
                    })
                }else if(res.length == 0){
                    socket.emit('connectState', {
                        connectState: false,
                    });
                }
            }
        })

    })
    //用户退出链接
    socket.on('disconnect', function (){
        //将退出的用户从在线列表中删除
        if(onlineUser.indexOf(currentUsername) > -1) {
            //删除
            onlineUser.splice(onlineUser.indexOf(currentUsername),1)
            //在线人数-1
            onlineCount--;

            console.log(currentUsername +'退出了聊天室');
            //向所有客户端广播用户退出
            socket.broadcast.emit('user leave', {
                username: currentUsername,
                onlineCount: onlineCount
            });
        }
    });
});




