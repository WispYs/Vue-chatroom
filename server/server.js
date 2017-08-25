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
var onlineUser = {};

var mongoose = require("../mongod/mongoose.js")
//数据库
// var MongoClient = require('mongodb').MongoClient;
// var DB_CONN_STR = 'mongodb://localhost:27017/chatroom';

// 加载所需要的模块
// var mongoose = require('mongoose');
// var db = mongoose.connect('mongodb://localhost:27017/chatroom');

// db.connection.on('error', function(error){
//   console.log('数据库连接失败：' + error);
// });

// db.connection.on('open', function(){
//   console.log('数据库连接成功');
// });

// var Schema = mongoose.Schema;

// var UserSchema = new mongoose.Schema({
//     userid: String,     //用户ID
//     username: String,   //用户名
//     password: String,   //密码
//     avator: String,     //头像
//     joindate: String,   //注册时间
//     address: String,    //地址

// },{collection:'userList'}) 
// // 注意这里一定要带有collection，否则mongoose会在下面model时对user添加后缀s.

// var UserModel = db.model('userList', UserSchema);

// var findPassword;    //用于存储异步数据
// var getUserPassword;        
// // 引入 events 模块 
// var events = require('events');
// // 创建 eventEmitter 对象
// var eventEmitter = new events.EventEmitter();
// //EventEmitter 的核心就是事件触发与事件监听器功能的封装。
// eventEmitter.on('getData',getPassword);

// //添加数据
// function creatData(data){
//     var registerState;
//     UserModel.find({username: data.username}, function(err, docs){
//         if (err) {
//             console.log('查询出错：' + err);
//         } else {
//             if(docs.length > 0){
//                 console.log('注册信息未通过：用户名已注册!');
//                 registerState = false;
//             }else if(docs.length == 0){
//                 console.log('注册信息通过!');
//                 UserModel.create(data, function(error, docs){
//                     if(error){
//                         console.log(error);
//                     }else{
//                         console.log('save ok');
//                         console.log(docs);
//                         registerState = true;
//                     }
//                 })
//             }
//         }
//     });
//     return registerState;
// }
// //查询数据
// function findData(data){
//     UserModel.find({username: data}, {password: 1, _id: 0}, function(err, docs){
//         if (err) {
//             console.log('查询出错：' + err);
//         } else {
//             if(docs.length > 0){
//                 console.log('查询结果为：' + docs);
//                 findPassword = docs;    //docs是个数组
//                 eventEmitter.emit('getData');
//             }else if(docs.length == 0){
//                 console.log('查询结果为：空');
//             }
            
//         }
//     });
// }
// //更新数据
// function upData(name, pwd){
//     UserModel.update({username: name}, {$set: {password: pwd}}, function(error){
//         if(error) {
//             console.log(error);
//         } else {
//             console.log('Update success!');
//             UserModel.find({username: name}, {password: 1}, function(err, docs){
//                 if (err) {
//                     console.log('查询出错：' + err);
//                 } else {
//                     console.log('更新' + name + '后的查询结果为：');
//                     console.log(docs);  // 只能更新本来已存在的数据
//                 }
//             });
//         }
//     });
// }
// //得到密码
// function getPassword(){
//     getUserPassword = findPassword[0].password;
//     console.log(getUserPassword)
// }

io.on('connection', function (socket){
    //当前用户信息
    var currentUserId = '';
    var currentUsername = '';
    var userPassword = '';
    var userAddress = '';
    var joinDate = '';
    var currentAvator = '';
    //新用户注册
    socket.on('register user', function (data){
        //记录当前玩家名字id
        currentUserId = data.userid;
        currentUsername = data.username;
        userPassword = data.password;
        userAddress = data.address
        joinDate = data.joindate;
        currentAvator = data.useravator
        console.log("新用户加入\nusername : "+currentUsername+"\npassword : "+userPassword+"\njoindata : "+joinDate+"\nuserid : "+currentUserId+"");
        var userData = {
            userid: currentUserId,
            username: currentUsername,
            password: userPassword,
            address: userAddress,
            joindate: joinDate,
            avator: currentAvator
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
                            loginState: 2,  //0 默认；1 没有账号；2 密码错误；3 登陆成功
                        })
                    }else if(data.password == res[0].password){
                        socket.emit('loginState', {
                            loginState: 3,  
                        })
                    }
                }else if(res.length == 0){
                    socket.emit('loginState', {
                        loginState: 1,  
                    });
                }
            }

        })

    })
    //用户发送信息
    socket.on('chat message', function (data){
        socket.broadcast.emit('chat message', {
            username: data.username,
            message: data.message,
            useravator: data.useravator
        });
        console.log('message: ' + data.message);
    });
    
    //用户退出链接
    socket.on('disconnect', function (){
        //将退出的用户从在线列表中删除
        if(onlineUser.hasOwnProperty(currentUserId)) {
            //删除
            delete onlineUser[currentUserId];
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




