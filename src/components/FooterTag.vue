<template>
    <div class="footer">
        <ul>
            <li v-for="(item, index) in footerList" @click="handleFooterList(item.router, index)" :class="index == footerIndex ? 'active' : ''">
                <i class="iconfont" :class="item.icon"></i>
                <span>{{item.name}}</span>
            </li>
        </ul>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                footerIndex: 0,
                footerList: [
                    {
                        name: '聊天室',
                        icon: 'icon-community',
                        router: '/Index/chat'
                    },
                    {
                        name: '游戏',
                        icon: 'icon-game',
                        router: '/Index/game'
                    },
                    {
                        name: '我的',
                        icon: 'icon-people',
                        router: '/Index/person'
                    },
                ]
            }
        },
        created(){
            this.footerIndex = sessionStorage.getItem("footerIndex");
        },
        components:{

        },
        methods: {
            handleFooterList(router, index) {
                this.$router.push(router);
                this.footerIndex = index;
            }
        }
    }
</script>

<style lang="scss">
    .footer{
        position:absolute;
        left:0;
        bottom:0;
        width:100%;
        display:flex;
        background:#eee;
        border-top:1px solid #dedede;
        ul{
            width:100%;
            display:flex;
            li{
                float:left;
                padding:6px 0;
                flex:1;
                text-align: center;
                i{
                    font-size:24px;
                }
                span{
                    display:block;
                    font-size:12px;
                }
            }
        }
        .active{
            color:#2b3953;
        }
    }

</style>
