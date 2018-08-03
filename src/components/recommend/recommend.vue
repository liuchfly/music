<template>
    <div>
        <mt-swipe :auto="2000" >
            <mt-swipe-item v-for="item in slider" :key="item.id">
                <img :src="item.picUrl" alt="">
            </mt-swipe-item>
        </mt-swipe>
    </div>
</template>
<script>
    
    export default {
        data() {
            return {
                slider:[]
            }
        },
        components:{
           
        },
        methods:{
            getsilder(){
                this.$axios.get('/lunbo').then(res=>{
                    if(res.data.code == 0){
                        this.slider = res.data.data.slider;
                    }
                })
            },
            winresize(){
                let mint = document.querySelector('.mint-swipe');
                var w = window.innerWidth;
                var h = 432/1080*w
                mint.style.height = h+'px';

            }
        },
        created:function(){
            this.getsilder();
            console.dir(window.innerWidth);
        },
        mounted() {
            this.winresize();
            window.addEventListener('resize',this.winresize);
        },
    }
</script>
<style lang="less" scoped>
.mint-swipe{
    background-color: #222;
    height: 100%;
    .mint-swipe-item{
        background-color: #222;
        height: 100%;
        img{
        width: 100%;
        }
    }
    
}
</style>