<template>
    <div class="chat-room">
        <div class="chat-con">
            <div class="chat-list" ref="chatlist">
                <div v-for="item in messageList">
                    <div class="chat-self" v-if="item.type === 1">
                        <img :src="item.useravator" alt="">
                        <span class="chat-s-name">{{item.username}}</span>
                        <span class="chat-s-msg">{{item.message}}</span>
                    </div>
                    <div class="chat-other" v-if="item.type === 2">
                        <img :src="item.useravator" alt="">
                        <span class="chat-o-name">{{item.username}}</span>
                        <span class="chat-o-msg">{{item.message}}</span>
                    </div>
                    <p class="chat-tip" v-if="item.type === 3">{{item.tip}}</p>
                </div>
                
                
            </div>
        </div>
        <div class="chat-form">
            <input class="form-input" type="text" v-model="sendMessage"/>
            <div class="form-right">
                <i class="iconfont icon-emoji"></i>
                <!-- <i class="iconfont icon-addition"></i> -->
                <div class="form-btn" @click="sendMsg">发送</div>
            </div>
            
        </div>
    </div>
</template>

<script>

    import Vue from 'vue';
    import io from 'socket.io-client';
    import {  mapState, mapMutations } from 'vuex';
    import { Toast } from 'mint-ui';
    export default {
        data() {
            return {
                title: '',
                onlineCount: 0,
                onlineUserList: [],
                messageList: [],
                sendMessage: '',
                userInfo: {},
                loginState: 0   //0 默认；1 没有账号；2 密码错误；3 登陆成功；4 未登陆
            }
        },
        created() {
            let _this = this;
         },
        computed: {
            ...mapState([
                
            ]),
        },
        mounted() {
            this.httpServer();
            this.loginState = JSON.parse(localStorage.getItem("loginState"));
            this.userInfo = JSON.parse(localStorage.getItem("userInfo"));
            this.socket.emit('join room', {userInfo: this.userInfo, roomId: this.$route.query.id})
        },
        watch: {
            loginState: function(val){
                let _this = this;
                if(val !== 3){
                    Toast('您还未登录，请重新登录');
                    setTimeout(function(){
                        _this.$router.push('/');
                    }, 1500)
                }
            }
        },
        components:{
            
        },
        methods: {
            ...mapMutations([
                'SAVE_USERINFO',
                'LOGIN_STATE'
            ]),
            httpServer () {
                let _this = this;
                this.socket = io.connect('http://localhost:3000');
                
                this.socket.on('sendMsg broadcast', function (data){
                    _this.messageList.push(data)
                })

                this.socket.on('join room broadcast', function (data){
                    _this.messageList.push(data)
                })

                this.socket.on('room usercount', function (data){
                    _this.messageList.push(data)
                })
            },
            changeTitle(title) {
                console.log(title);
                document.title = title;
                let i = document.createElement('iframe');
                i.src = '//m.baidu.com/favicon.ico';
                i.style.display = 'none';
                i.onload = function() {
                    setTimeout(function(){
                        i.remove();
                    }, 9)
                }
                document.body.appendChild(i);
            },
            sendMsg() {
                this.sendMessage = Wisper.trim(this.sendMessage);
                if(this.sendMessage.length > 0){
                    let messageInfo = {
                        type: 1,    //1: 本人信息   2：其他人信息   3：提示信息
                        username: this.userInfo.username,
                        message: this.sendMessage,
                        useravator: this.userInfo.avator
                    }
                    this.socket.emit('sendMsg', messageInfo)
                    this.messageList.push(messageInfo)
                    this.sendMessage = '';
                }
            }

        }
    }
</script>

<style lang="scss">
    .chat-room{
        height:100%;
        color:#999;
        position:relative;
        .chat-con{
            height: calc(100% - 60px);
            padding: 10px 20px;
            overflow: auto;
            .chat-list{
                .chat-tip{
                    font-size:12px;
                    text-align: center;
                    margin:5px 0;
                }
                .chat-self{
                    position: relative;
                    margin: 15px 0;
                    overflow: hidden;
                    img{
                        float:right;
                        width: 40px;
                        height: 40px;
                        border-radius: 50%;
                        overflow: hidden;
                    }
                    .chat-s-name{
                        position: absolute;
                        right: 50px;
                        top: 0px;
                        font-size: 12px;
                        color: #999;
                    }
                    .chat-s-msg{
                        float:right;
                        margin-right: 10px;
                        line-height: 23px;
                        color: white;
                        background: #3398dc;
                        padding: 10px;
                        font-size: 14px;
                        border-radius: 10px;
                        margin-top: 24px;
                        min-width: 50px;
                        font-style: normal;
                        max-width: 68%;
                        word-break: break-all;
                        position: relative;
                    }
                    .chat-s-msg:after {
                        content: "";
                        position: absolute;
                        right: -5px;
                        top: 4px;
                        width: 0;
                        height: 0;
                        border-top: 0px solid transparent;
                        border-left: 8px solid #3398dc;
                        border-bottom: 16px solid transparent;
                    }
                }
                .chat-other{
                    position: relative;
                    margin: 15px 0;
                    overflow: hidden;
                    img{
                        float:left;
                        width: 40px;
                        height: 40px;
                        border-radius: 50%;
                        overflow: hidden;
                    }
                    .chat-o-name{
                        position: absolute;
                        left: 50px;
                        top: 0px;
                        font-size: 12px;
                        color: #999;
                    }
                    .chat-o-msg{
                        float:left;
                        margin-left: 10px;
                        line-height: 23px;
                        color: white;
                        background: #3398dc;
                        padding: 10px;
                        font-size: 14px;
                        border-radius: 10px;
                        margin-top: 24px;
                        min-width: 50px;
                        text-align: center;
                        font-style: normal;
                        max-width: 68%;
                        word-break: break-all;
                        position: relative;
                    }
                    .chat-o-msg:after {
                        content: "";
                        position: absolute;
                        left: -5px;
                        top: 4px;
                        width: 0;
                        height: 0;
                        border-top: 0px solid transparent;
                        border-right: 8px solid #3398dc;
                        border-bottom: 16px solid transparent;
                    }
                }
            }
        }
        .chat-form{
            position:fixed;
            bottom:0;
            left:0;
            width:100%;
            height:40px;
            background:white;
            overflow:hidden;
            display:flex;
            align-items:center;
            .form-input{
                float:left;
                width:calc(100% - 130px);
                margin-left:20px;
                padding-left:10px;
                border-bottom:1px solid #dedede;
                height:30px;
                line-height:30px;
                font-size:14px;
            }
            .form-right{
                float:right;
                width:100px;
                display:flex;
                align-items:center;
            }
            .form-btn{
                float:left;
                font-size:14px;
                padding:4px 8px;
                color:white;
                border-radius:4px;
                background:#2b3953;

            }
            i{
                float:left;
                font-size:32px;
                margin-right:10px;
            }
        }
    }

</style>
