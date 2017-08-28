<template>
    <div class="game">
        <List v-for="(item, index) in gameList" :key="index" :logo="item.logo" :title="item.title" :message="item.message" :router="item.router" :id="item.gameid"></List>
    </div>
</template>

<script>
    import List from '../components/List'
    export default {
        data() {
            return {
                gameList: [
                    {
                        logo: 'static/miku.jpg',
                        title: '动漫',
                        message: '鲁路修：All Hail Lelouch!',
                        router: '/Gameroom',
                        gameid: '1'
                    },
                    {
                        logo: 'static/dota.ico',
                        title: 'Dota2',
                        message: 'CN DOTA BEST DOTA',
                        router: '/Gameroom',
                        gameid: '2'
                    },
                    
                    
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
