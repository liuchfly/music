<template>
    <scroll 
        :data="data" 
        class="listview" 
        ref="listView"
        :listenScroll="listenScroll"
        :probeType="probeType"
        @scroll ='scroll'
        >
        <ul>
            <li v-for="item in data" :key="item.title" class="list-group" ref="listGroup" >
                <h2 class="list-group-title">{{item.title}}</h2>
                <ul>
                    <li v-for="item in item.item" :key="item.id" class="item-group" @click="selectItem(item)">
                        <img v-lazy="item.avatar" alt="" height="50" width="50" class="avatar">
                        <span class="name">{{item.name}}</span>
                    </li>
                </ul>
            </li>
        </ul>
        <div class="list-shortcut" @touchstart="onShartcutTouchStart" @touchmove.stop.prevent="onShartcutTouchMove">
            <ul>
                <li v-for="(item,index) in shortCutList" :data-index="index" :key="item" class="item" :class="{current:index === currentIndex}">
                    {{item}}
                </li>
            </ul>
        </div>
    </scroll>
</template>
<script>
import Scroll from 'base/scroll/scroll'
import { getData } from 'common/dom' 
const ANCHOR_HEIGHT = 20
export default {
    props:{
        data:{
            type:Array,
            default:[]
        }
    },
    data(){
        return {
            scrollY:-1,
            currentIndex:0,
            probeType:3
        }
    },
    created(){
        this.touch={};
        this.listenScroll = true,
        this.listHeight=[]
    },
    computed:{
        shortCutList(){
            return this.data.map((item)=>{
                return item.title.substr(0,1);
            })
        }
    },
    methods:{
        onShartcutTouchStart(el){
            let anchorIndex = getData(el.target,'index')
            let firsttouch = el.touches[0];
            this.touch.y1 = firsttouch.pageY;
            this.touch.anchorIndex = anchorIndex;
            this._scrollTo(anchorIndex)
        },
        onShartcutTouchMove(el){
            let firstTouch = el.touches[0];
            this.touch.y2 = firstTouch.pageY;
            let delta = (this.touch.y2-this.touch.y1) / ANCHOR_HEIGHT | 0;
            let anchorIndex = Number(this.touch.anchorIndex) + delta;
            this._scrollTo(anchorIndex)
        },
        selectItem(item){
            this.$emit('select',item)
        },
        scroll(pos){
            this.scrollY = pos.y
        },
        _scrollTo(index){
            this.scrollY = -this.listHeight[index];
            this.$refs.listView.scrollToElement(this.$refs.listGroup[index],0);
        },
        _calculateHeight(){
            this.listHeight=[];
            const list = this.$refs.listGroup;
            let height = 0;
            this.listHeight.push(height);
            for (let index = 0; index < list.length; index++) {
                let item = list[index]
                height += item.clientHeight;
                this.listHeight.push(height)
            }
        }
    },
    watch:{
        data(){
            setTimeout(() => {
                this._calculateHeight();
            }, 20);
        },
        scrollY(newY){
            const listHeight = this.listHeight;
            // newY大于0时
            if (newY>0) {
                this.currentIndex = 0;
                return ;
            }
            for (let i = 0; i < listHeight.length; i++) {
                let height1 = listHeight[i];
                let height2 = listHeight[i+1];
                if(!height2 || (-newY >= height1 && -newY < height2)){
                    this.currentIndex = i;
                    return ;
                }
            }
            this.currentIndex = 0;
        }
    },
    components:{
        Scroll
    }
}
</script>
<style lang="less" scoped>
.listview{
    position: relative;
    height:100%;
    width:100%;
    overflow:hidden;
    background-color: #222;
    .list-group{
        padding-bottom: 30px;
        >.list-group-title{
            height: 30px;
            line-height: 30px;
            font-size: 14px;
            background-color: #aaa;
            padding-left:20px;
            color:#fff;
        }
        .item-group{
            display:flex;
            align-items: center;
            padding:20px 0 0 30px;
            >.avatar{
                border-radius: 50%;
            }
            >.name{
                color:#fff;
                font-size:14px;
                padding-left:30px;
            }
        }
    }
    >.list-shortcut{
        position: absolute;
        top:50%;
        transform: translateY(-50%);
        right:10px;
        width:20px;
        text-align: center;
        padding:20px 0;
        border-radius: 10px;
        background-color: blueviolet;
        .item{
            padding:3px;
            line-height: 1;
            color:#fff;
            font-size: 14px;
        }
        .current{
            color:darkorange;
        }
    }
}
</style>


