<template>
    <div class="music-list">
        <div class="back" @click="goBack">
            <i class="iconfont icon-fanhui"></i>
        </div>
        <h1 class="title" v-html="title"></h1>
        <div class="bg-image" :style="bgStyle" ref="bgImage">
            <div class="filter">
            </div>
        </div>
        <div class="bg-layer" ref="bgLayer"></div>
        <scroll :data="songs" class="list" ref="list" @scroll="scroll" :listenScroll="listenScroll" :probeType="probeType">
            <div class="song-list-wrapper">
                <song-list :songs="songs" @select="selectItem"></song-list>
            </div>
        </scroll>
    </div>
</template>
<script>
import Scroll from 'base/scroll/scroll'
import SongList from 'base/songlist/songlist'
import { mapActions } from 'vuex'

const RESERVED_HEIGHT = 40
export default {
    props:{
        title:{
            type:String,
            default:''
        },
        songs:{
            type:Array,
            default:[]
        },
        bgImage:{
            type:String,
            default:''
        }
    },
    created(){
        this.probeType = 3;
        this.listenScroll = true
    },
    mounted() {
       this.imageHeight = this.$refs.bgImage.clientHeight;
       this.minTransY = -this.imageHeight+RESERVED_HEIGHT;
       this.$refs.list.$el.style.top = `${this.$refs.bgImage.clientHeight}px`;
    },
    methods:{
        goBack(){
            this.$router.go(-1);
        },
        scroll(pos){
            let translateY = Math.max(this.minTransY,pos.y)
            this.$refs.bgLayer.style['transform'] = `translate3d(0,${translateY}px,0)`;
            let zIndex = 0;
            let scale = 1;

            if(pos.y > 0){
                scale += pos.y/this.imageHeight;
            }        
            if(pos.y < translateY){
                this.$refs.bgImage.style.height = RESERVED_HEIGHT + 'px';
                this.$refs.bgImage.style.paddingTop = 0;
                zIndex = 10;
            }else{
                this.$refs.bgImage.style.height = 0;
                this.$refs.bgImage.style.paddingTop = '70%'
            }
            this.$refs.bgImage.style.zIndex = zIndex;
            this.$refs.bgImage.style['transform'] = `scale(${scale})`;
        },
        selectItem(item,index){
            this.selectPlay({list:this.songs,index:index});
        },
        ...mapActions([
            'selectPlay'
        ])
    },
    computed:{
        bgStyle(){
            return `background-image:url(${this.bgImage})`
        }
    },
    components:{
        Scroll,
        SongList
    }
}
</script>
<style lang="less" scoped>
.music-list{
    position: fixed;
    left: 0;
    right:0;
    top:0;
    bottom:0;
    z-index: 100;
    background-color: #222;
    >.back{
        position:absolute;
        top:10px;
        left:10px;
        z-index: 50;
        height: 20px;
        width: 20px;
        font-weight: 700;
        .icon-fanhui{
            font-size:24px;
            color:#fff;
        }
    }
    >.title{
        position:absolute;
        top:0;
        left:10%;
        width:80%;
        line-height: 40px;
        font-size: 16px;
        text-align: center;
        color:#fff;
        z-index:40;
    }
    >.bg-image{
        position: relative;
        width:100%;
        padding-top:70%;
        height: 0;
        transform-origin: top;
        background-size: cover;
        background-color: yellow;
    }
    >.bg-layer{
        position: relative;
        height: 100%;
        background-color: #222;
    }
    >.list{
        position: fixed;
        top:0;
        bottom:0;
        width:100%;
        .song-list-wrapper{
            padding:20px 0;
        }
    }
}
</style>

