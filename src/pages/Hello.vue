<template>
    <div class="hello">
        <div class="logo">
            <img src="../img/c9.png" alt="">
            <p>{{name}}</p>
        </div>
        <div class="login-form">
            <Login v-if="haveAccount" v-on:have-account="accountChange"></Login>
            <Register v-else v-on:have-account="accountChange"></Register>
        </div>
    </div>
</template>

<script>
    import Login from '../components/Login'
    import Register from '../components/Register'
    import { Indicator } from 'mint-ui';
    export default {
        name: 'hello',
        data (){
            return {
                name: 'MLENI',
                haveAccount: true
            }
        },
        components:{
            Login,
            Register
        },
        methods: {
            accountChange(haveAccount){
                let _this = this;
                Indicator.open('加载中...');
                setTimeout(function(){
                    Indicator.close();
                    _this.haveAccount = haveAccount;
                }, 800)
                
            }
        }
    }
</script>

<style lang="scss">
    .hello{
        height:100%;
        background:#2b3953;
        font-family: "Governor"!important;
        color:#999;
        .logo{
            padding-top:55%;
            margin:0 auto;
            text-align:center;
            font-size:20px;
            img{
                width:100px;
                margin:0 auto;
            }
            p{
                margin-top:10px;
            }
        }
        .login-form{
            margin: 15% 30px 0;
            .login-input{
                height:30px;
                line-height:30px;
                margin-top:20px;
                border-bottom:1px solid #666;
                .iconfont{
                    float:left;
                    width:15%;
                    font-size:22px;
                }
                input{
                    float:left;
                    width:75%;
                    height:30px;
                    line-height:30px;
                    border:0;
                    font-size:14px;
                    color:#999;
                    background:none;
                }
            }
            .login-btn{
                width:100%;
                margin-top:15%;
                margin-bottom:10px;
                height:40px;
                font-size:16px;
                background:#379386;
                color: #f2f2f2;
                border:0;
            }
            p{
                text-align:center;
                font-size:12px;
                margin: 4px 0;
            }
        }
    }

</style>
