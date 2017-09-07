var mongoose = require('mongoose');
var db = mongoose.connect('mongodb://59.110.218.21:27017/chatroom');

db.connection.on('error', function(error){
  console.log('数据库连接失败：' + error);
});

db.connection.on('open', function(){
  console.log('数据库连接成功');
});

var Schema = mongoose.Schema;

var UserSchema = new mongoose.Schema({
    userid: String,     //用户ID
    username: String,   //用户名
    password: String,   //密码
    avator: String,     //头像
    joindate: String,   //注册时间
    address: String,    //地址

},{collection:'userList'}) 
// 注意这里一定要带有collection，否则mongoose会在下面model时对user添加后缀s.

var UserModel = db.model('userList', UserSchema);

//添加数据
function creatData(data, cb){
    UserModel.create(data,cb)
}
//查询数据密码
function findPassword(name, cb){
    UserModel.find({username: name},{password: 1, _id: 0},cb);
}
//查询数据
function findData(name, cb){
    UserModel.find({username: name},cb);
}
//更新数据
function upData(name, pwd){
    UserModel.update({username: name}, {$set: {password: pwd}}, function(error){
        if(error) {
            console.log(error);
        } else {
            console.log('Update success!');
            UserModel.find({username: name}, {password: 1}, function(err, docs){
                if (err) {
                    console.log('查询出错：' + err);
                } else {
                    console.log('更新' + name + '后的查询结果为：');
                    console.log(docs);  // 只能更新本来已存在的数据
                }
            });
        }
    });
}

module.exports.creatData = creatData;
module.exports.findData = findData;
module.exports.findPassword = findPassword;
module.exports.upData = upData;