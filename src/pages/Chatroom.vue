<template>
    <div class="chat-room">
        <div class="chat-form">
            <input class="form-input" type="text" />
            <div class="form-right">
                <i class="iconfont icon-emoji"></i>
                <!-- <i class="iconfont icon-addition"></i> -->
                <div class="form-btn">发送</div>
            </div>
            
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
