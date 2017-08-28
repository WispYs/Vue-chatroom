<template>
    <div class="chat-room">
        <div class="chat-con">
            <div class="chat-list" ref="chatlist">
                <p class="chat-tip">欢迎来到本聊天室！</p>
                <p class="chat-tip">房间有{{onlineCount}}人在线</p>
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
    export default {
        data() {
            return {
                title: '',
                loginState: 0,  //0 默认；1 没有账号；2 密码错误；3 登陆成功；4 未登陆
                onlineCount: 0,
                onlineUserList: [],
                messageList: [],
                sendMessage: '',
            }
        },
        created() {
            let _this = this;
            this.$root.$once("title", this.changeTitle)
        },
        mounted() {
            this.httpServer();
        },
        watch: {
            loginState: function(val){
                let _this = this;
                if(val !== 3){
                    Toast('您还未登录，请重新登录');
                    setTimeout(function(){
                        _this.$router.push('/Index');
                    }, 1500)
                }
            }
        },
        components:{
            
        },
        methods: {
            httpServer () {
                let _this = this;
                this.socket = io.connect('http://localhost:3000');
                this.socket.on('loginState', function(data){
                    _this.loginState = data.loginState; //0 默认；1 没有账号；2 密码错误；3 登陆成功
                });
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
                if(this.sendMessage > 0){
                    let messageInfo = {
                        type: 1,
                        username: username,
                        message: this.sendMessage,
                        
                        
                    }
                    this.socket.emit('sendMsg', messageInfo)

                }
                // var joinTip = document.createElement('p');
                // joinTip.innerText = 'Hello World'
                // this.$refs.chatlist.appendChild(joinTip)
                
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
