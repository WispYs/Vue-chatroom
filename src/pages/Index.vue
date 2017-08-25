<template>
    <div class="index">
        <router-view keep-alive></router-view>
        <footer-tag></footer-tag>
    </div>
</template>

<script>
    import FooterTag from '../components/FooterTag';
    import Chat from '../pages/Chat'
    import Game from '../pages/Game'
    import Person from '../pages/Person'
    export default {
        data (){
            return {
                
            }
        },
        components:{
            FooterTag,
        },
        methods: {

        }
    }
</script>

<style lang="scss">
    .index{
        height:100%;
        color:#999;
        position:relative;
    }

</style>
