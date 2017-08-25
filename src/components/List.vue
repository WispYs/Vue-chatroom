<template>
    <div class="list" @click="handleList(title,router, id)">
        <img class="list-logo" :src="logo" alt="" />
        <div class="list-con">
            <h3 class="list-tit">{{title}}</h3>
            <p class="list-info">
                <span class="list-msg">{{message}}</span>
            </p>
        </div>
        
    </div>
</template>

<script>
    export default {
        data() {
            return {
                
            }
        },
        props: ['logo', 'title', 'message', 'router', 'id'],
        components:{

        },
        methods: {
            handleList(title, router, id){
                this.$router.push({path: router, query: {id: id}});
                this.$root.$emit("title", title)
            }
        }
    }
</script>

<style lang="scss">
    .list{
        border-bottom:1px solid #dedede;
        background:white;
        padding:10px;
        overflow:hidden;
        display:flex;
        align-items:center;
        .list-logo{
            float:left;
            width:40px;
            height:40px;
            margin:0 10px;
        }
        .list-con{
            float:left;
            .list-tit{
                font-weight:normal;
                font-size:14px;
                color:#333;
            }
            .list-info{
                font-size:12px;
                color:#999;
            }
        }
    }

</style>
