<template>
    <div class="chat-room">
        <div class="chat-form">
            <input type="text" />
            <i class="iconfont icon-emoji"></i>
            <i></i>
        </div>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                title: ''
            }
        },
        created() {
            let _this = this;
            this.$root.$once("title", this.changeTitle)
        },
        components:{
            
        },
        methods: {
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
            }
        }
    }
</script>

<style lang="scss">
    .chat-room{
        height:100%;
        color:#999;
        position:relative;
    }

</style>
