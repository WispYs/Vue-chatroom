<template>
    <div class="register">
        <div class="login-input">
            <i class="iconfont icon-people"></i>
            <input type="text" id="username" placeholder="请输入法号" v-model="username"/>  
        </div>
        <div class="login-input">
            <i class="iconfont icon-lock"></i>
            <input type="text" id="password" placeholder="请输入秘籍" v-model="password"/>  
        </div>
        <mt-button type="default" class="login-btn" @click="submitUserInfo">注册</mt-button>
        <p @click="signUp">贫僧有法号！</p>
    </div>
</template>

<script>
import { Toast } from 'mint-ui';
import io from 'socket.io-client';
export default {
    data() {
        return {
            username: '',   //用户名
            password: '',   //密码
            userid: '',     //用户id
            avator: '',     //用户头像  
            joindata: '',   //注册时间
            connectState: true,  //数据库连接状态
            validUsername: true,  //用户名验证
            creatState: false,  //注册用户状态
        }
    },
    mounted() {
        this.httpServer();
    },
    watch: {
        connectState: function(val){
            if(!val){
                Toast('数据库异常！');
            }
        },
        validUsername: function(val){
            if(!val){
                Toast('用户名已存在！');
            }
        },
        creatState: function(val){
            let _this = this;
            if(val){
                Toast('恭喜您，注册成功！');
                setTimeout(function(){
                    _this.$router.push('/Index');
                }, 2000)
            }else{
                Toast('注册失败！');
            }

        }

    },
    methods: {
        httpServer() {
            let _this = this;
            this.socket = io.connect('http://localhost:3000');
            //数据库连接状态
            this.socket.on('connectState', function(data){
                _this.connectState = data.connectState;

            });
            //验证用户名是否可用
            this.socket.on('validUsername', function(data){
                _this.validUsername = data.validUsername;

            });
            //注册用户情况
            this.socket.on('creatUserInfo', function(data){
                _this.creatState = data.creatState;
            });
        },
        signUp() {
            this.$emit('have-account',true);
        },
        submitUserInfo() {
            if(this.username.length > 10 || this.username.length < 3){
                Toast('用户名长度必须在3~10位之间');
            }else if(!Wisper.checkPassword(this.password)){
                Toast('密码只能输入6-20个字母、数字、下划线 ');
            }else{
                let userInfo = {
                    username: this.username,
                    password: this.password,
                    userid: Wisper.getSid(),
                    useravator: this.getAvator(),
                    joindate: Wisper.getNowDate(),
                    address: '上海市'
                }
                //服务端发送注册请求
                this.socket.emit('register user', userInfo);
            }
        },
        getAvator () {
            return Global.avatorArr[Math.floor(Math.random()*Global.avatorArr.length)];
        }

    }
}
</script>

