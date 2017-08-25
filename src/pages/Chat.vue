<template>
    <div class="chat">
        <List v-for="item in chatList" :logo="item.logo" :title="item.title" :message="item.message" :router="item.router" :id="item.roomid"></List>
    </div>
</template>

<script>
    import List from '../components/List'
    export default {
        data() {
            return {
                chatList: [
                    {
                        logo: 'static/dota.ico',
                        title: '公共聊天室',
                        message: '路人甲：大撒旦撒',
                        router: '/Chatroom',
                        roomid: '1'
                    },
                    {
                        logo: 'static/miku.jpg',
                        title: '动漫天地',
                        message: '鲁路修：All Hail Lelouch!',
                        router: '/Chatroom',
                        roomid: '2'
                    },
                    {
                        logo: 'static/favicon.ico',
                        title: 'c9聊天室',
                        message: '路人甲：大撒旦撒',
                        router: '/Chatroom',
                        roomid: '3'
                    }
                ]
            }
        },
        components:{
            List,
        },
        methods: {

        }
    }
</script>

<style lang="scss">
    

</style>
