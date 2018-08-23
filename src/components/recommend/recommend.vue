<template>
    <scroll class="recommend" :data="discList" ref="scroll"> 
        <div>
            <div class="recommend-content">
                <div v-if="slider.length" class="slider-wrapper">
                    <slider>
                        <div v-for="item in slider" :key="item.id">
                            <a :href="item.linkUrl">
                                <img @load="loadImage" :src="item.picUrl" alt="">
                            </a>
                        </div>
                    </slider>
                </div>
             </div>
            <div class="recommend-list">
                <h1 class="list-title">热门歌曲</h1>
                <ul>
                    <li v-for="item in discList" :key="item.imgurl" class="item">
                        <div class="icon">
                            <img v-lazy="item.imgurl" height="60" width="60" alt="">
                        </div>
                        <div class="text">
                            <h2 class="name" v-html="item.creator.name"></h2>
                            <p class="desc" v-html="item.dissname"></p>
                        </div> 
                    </li>
                </ul>
            </div>
            <div class="loading-content" v-show="!discList.length">
                <loading></loading>
            </div>
        </div>
    </scroll>
</template>
<script>
    import Slider from 'base/slider/slider'
    import Scroll from 'base/scroll/scroll'
    import Loading from 'base/loading/loading'
    import { getRecommend , getDiscList} from 'api/recommend'
    import { ERR_OK } from 'api/config'
    
    export default {
        data() {
            return {
                slider:[],
                discList:[]
            }
        },
        components:{
           Slider,
           Scroll,
           Loading
        },
        methods:{
            _getPlaylist(){
                getDiscList.apply(this).then(res=>{
                    if(res.code == ERR_OK){
                        this.discList = res.data.list;
                    }
                })
            },
            winresize(){
                let mint = document.querySelector('.mint-swipe');
                var w = window.innerWidth;
                var h = 432/1080*w
                mint.style.height = h+'px';
            },
            _getRecommend(){
                getRecommend().then((res)=>{
                    if(res.code == 0){
                        this.slider = res.data.slider;
                    }
                })
            },
            loadImage(){
                if(this.checkLoading){
                    this.$refs.scroll.refresh();
                    // this.checkLoading = true;
                }
                
            }
        },
        created:function(){
            this._getPlaylist();
            this._getRecommend();
            // console.dir(window.innerWidth);
        },
        mounted() {
            // this.winresize();
            // window.addEventListener('resize',this.winresize);
        },
    }
</script>
<style lang="less" scoped>
.recommend{
    position:fixed;
    top:88px;
    bottom:0;
    width:100%;
    z-index: -1;
    background-color: #222;
    .recommend-content{
        width:100%;
        overflow:hidden;
        >.slider-wrapper{
            position: relative;
            width: 100%;
            overflow: hidden;
        }
    }
    .recommend-list{
        >.list-title{
            text-align: center;
            font-weight: 300;
            height: 65px;
            line-height: 65px;
            color:lightgreen;
        }
        .item{
            display:flex;
            box-sizing: border-box;
            align-items: center;
            padding:0 20px 20px 20px;
            color:#fff;
            >.icon{
                flex: 0 0 60px;
                width: 60px;
                padding-right: 20px;
            }
            >.text{
                display:flex;
                flex-direction: column;
                justify-content: center;
                flex:1;
                line-height: 20px;
                overflow:hidden;
                font-size: 14px;
                >.name{
                    padding-bottom: 10px;
                    font-size: 16px;
                }

            }
        }   
    }
    .loading-content{
        position: fixed;
        width: 100%;
        top:50%;
        transform: translateY(50%);
        z-index: 10000;
    }
}

</style>