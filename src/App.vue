<template>
    <div id="app">
        <router-view></router-view>
    </div>
</template>

<script>
export default {
    data() {
        return {

        }

    },
    watch: {
        $route : function(){
            var footerIndex = 0;
            if(this.$route.name == 'chat'){
                footerIndex = 0;
            }else if(this.$route.name == 'game'){
                footerIndex = 1;
            }else if(this.$route.name == 'person'){
                footerIndex =2;
            }
            localStorage.setItem("footerIndex", footerIndex)
        }
    },
}
</script>

<style lang="scss">
    @import './style/reset';
    @import './style/font/iconfont.css';
    #app{
        height:100%;
    }
</style>
