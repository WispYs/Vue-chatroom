<template>
    <div class="login">
        <div class="login-input">
            <i class="iconfont icon-people"></i>
            <input type="text" ref="usernameInput" id="username" v-model="username" placeholder="请输入法号" />  
        </div>
        <div class="login-input">
            <i class="iconfont icon-lock"></i>
            <input type="password" ref="passwordInput" id="password" placeholder="请输入秘籍" v-model="password"/>  
        </div>
        <mt-button type="default" class="login-btn" @click="validUserInfo">登录</mt-button>
        <p @click="signUp">施主还没有法号？</p>
    </div>
</template>

<script>
import { Toast } from 'mint-ui';
import { Indicator } from 'mint-ui';
import io from 'socket.io-client';
import { mapMutations } from 'vuex'
export default {
    data() {
        return{
            username: '',
            password: '',
            loginState: 0   //0 默认；1 没有账号；2 密码错误；3 登陆成功；4 未登陆
        }
    },
    mounted() {
        this.httpServer();
        this.LOGIN_STATE(this.loginState);
    },
    watch: {
        loginState: function(val){
            let _this = this;
            if(val == 1){
                Toast('用户名不存在，请注册账号');
                this.$refs.usernameInput.focus();
            }else if(val == 2){
                Toast('密码错误，请重新输入');
                this.$refs.passwordInput.focus();
            }else if(val == 3){
                Indicator.open('加载中...');
                let userInfo = {
                    username: this.username,
                    password: this.password,
                }
                this.SAVE_USERINFO(userInfo);
                setTimeout(function(){
                    Indicator.close();
                    _this.$router.push('/Index');
                }, 1500)
            }
            this.LOGIN_STATE(this.loginState);
        }
    },
    methods: {
        ...mapMutations([
            'SAVE_USERINFO',
            'LOGIN_STATE'
        ]),
        httpServer () {
            let _this = this;
            this.socket = io.connect('http://localhost:3000');
            this.socket.on('loginState', function(data){
                _this.loginState = data.loginState; //0 默认；1 没有账号；2 密码错误；3 登陆成功
            });
        },
        signUp() {
            this.$emit('have-account',false);
        },
        validUserInfo() {
            if(this.username.length > 10 || this.username.length < 3){
                Toast('用户名长度必须在3~10位之间');
            }else if(!Wisper.checkPassword(this.password)){
                Toast('密码只能输入6-20个字母、数字、下划线 ');
            }else{
                this.loginState = 0;
                let userInfo = {
                    username: this.username,
                    password: this.password,
                }
                //服务端发送登录请求
                this.socket.emit('login', userInfo);
            }
        }
    }
}
</script>

