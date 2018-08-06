<template>
  <div class="slider" ref="slider">
    <div class="slider-group" ref="sliderGroup">
      <slot>
      </slot>
    </div>
    <div class="dots">
      <span class="dot" v-for="(item,index) in dots" :key="index" :class="{active:currentPageIndex
      === index}"></span>
    </div>
  </div>
</template>
<script>
import BScroll from 'better-scroll'
import { addClass } from 'common/dom'
export default {
    data() {
        return {
            dots:[],
            currentPageIndex:0
        }
    },
    props:{
        loop:{
            type:Boolean,
            default:true
        },
        autoPlay:{
            type:Boolean,
            default:true
        },
        interval:{
            type:Number,
            default:2000
        }
    },
    mounted() {
        setTimeout(() => {
            this._setSliderWidth();
            this._initDots();
            this._initSlider();
            if(this.autoPlay){
                this._play();
            }
        }, 20);
        window.addEventListener('resize', () => {
            if (!this.slider) {
             return
            }
            this._setSliderWidth(true)
            this.slider.refresh()
        });
    },
    methods:{
        _setSliderWidth(resize){
            this.children = this.$refs.sliderGroup.children

            let width = 0
            let sliderWidth = this.$refs.slider.clientWidth
            for (let i = 0; i < this.children.length; i++) {
                let child = this.children[i];
                addClass(child,'slider-item');
                child.style.width = sliderWidth + 'px';
                width += sliderWidth;
            }
            if(this.loop && !resize){
                width += 2*sliderWidth;
                this.$refs.sliderGroup.style.width = width + 'px';
            }
         },
        _initSlider(){
            this.slider = new BScroll(this.$refs.slider, {
            scrollX: true,
            scrollY: false,
            momentum: false,
            snap:  {
                loop:this.loop
            },
            snapThreshold: 0.3,
            snapSpeed: 400
            })

            this.slider.on('scrollEnd',()=>{
                let pageIndex = this.slider.getCurrentPage().pageX
                this.currentPageIndex = pageIndex
                if (this.autoPlay) {
                     this._play()
                }
            })
            
        },
        _initDots(){
           this.dots = new Array(this.children.length);
        },
        _play(){
            clearTimeout(this.timer)
                this.timer = setTimeout(() => {
                    this.slider.next()
                }, this.interval)
        }
    },
    destroyed() {
        // clearTimeout(this.timer);
    },
}
</script>
<style lang="less" scoped>
.slider{
    min-height: 1px;
    position: relative;
    >.slider-group{
        position:relative;
        overflow: hidden;
        white-space:nowrap;
        >.slider-item{
            float:left;
            box-sizing: border-box;
            overflow: hidden;
            text-align: center;
             >a{
                display: block;
                width: 100%;
                overflow: hidden;
                text-decoration: none;
                >img{
                    display: block;
                    width: 100%;
                }
             }
        }
    }
    >.dots{
        overflow: hidden;
        position: absolute;
        right:0;
        left:0;
        bottom:10px;
        text-align: center;
        >.dot{
            display: inline-block;
            margin:0 4px;
            height: 8px;
            width: 8px;
            border-radius: 50%;
            background-color: #fff;
        }
        >.active{
             width: 20px;
             border-radius: 5px;
             background: #fff;
        }
    }
}
</style>



