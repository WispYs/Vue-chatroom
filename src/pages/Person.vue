<template>
    <div class="person">
        <div class="user-con">
            <div class="user-info">
                <img class="user-avator" :src="userInfo.avator" />
                <p class="user-name">{{userInfo.username}}</p>
                <p class="user-point">积分：{{userInfo.userpoint ? userInfo.userpoint : 0}}</p>
            </div>
        </div>
        <div class="person-con">
            <ul>
                <li>
                    <i class="iconfont icon-mail"></i>
                    <span>我的房间</span>
                    <i class="iconfont icon-gengduo"></i>
                </li>
                <li>
                    <i class="iconfont icon-mail"></i>
                    <span>我的好友</span>
                    <i class="iconfont icon-gengduo"></i>
                </li>
                <li>
                    <i class="iconfont icon-mail"></i>
                    <span>我的好友</span>
                    <i class="iconfont icon-gengduo"></i>
                </li>
            </ul>
        </div>
    </div>
</template>

<script>
    export default {
        data (){
            return {
                userInfo: {}
            }
        },
        components:{

        },
        mounted() {
            this.userInfo = JSON.parse(sessionStorage.getItem("userInfo"));
        },
        methods: {
        }
    }
</script>

<style lang="scss">
    .person{
        height:calc(100% - 55px);
        .user-con{
            height:50%;
            background:#2b3953;
            position:relative;
            text-align: center;
            .user-info{
                position:absolute;
                top:50%;
                left:50%;
                transform:translate(-50%, -50%);
            }
            .user-avator{
                width:120px;
                height:120px;
                border-radius:50%;
            }
            .user-name{
                font-size:18px;
                color:white;
                margin:10px 0;
            }
            .user-point{
            }
        }
        .person-con{
            background:white;
            ul{
                li{
                    height:44px;
                    line-height:44px;
                    margin-left:15px;
                    i:first-child{
                        float:left;
                    }
                    i:last-child{
                        float:right;
                        margin-right:15px;
                    }
                    span{
                        float:left;
                        font-size:14px;
                        color:black;
                        margin-left:10px;
                    }
                }
                li:not(:last-child){
                    border-bottom:1px solid #dedede;
                }
            }
        }
    }

</style>
