<template>
    <div class="player" v-show="playList.length > 0">
        <transition 
        name="normal"
        @enter="enter"
        @afterEnter="afterEnter"
        @leave="leave"
        @afterLeave="afterLeave"
        >
            <div class="normal-player" v-show="fullScreen">
            <div class="background">
                <img :src="currentSong.image" width="100%" height="100%" alt="">
            </div>
            <div class="top">
                <div class="back" @click="back">
                    <i class="iconfont icon-bofangqishouqi"></i>
                </div>
                <h1 class="title" v-html="currentSong.name"></h1>
                <h2 class="subtitle" v-html="currentSong.singer"></h2>
            </div>
            <div class="middle">
                <div class="middle-l" >
                    <div class="cd-wrapper" ref="cdWrapper">
                        <div class="cd" :class="csCls">
                            <img class="image"  :src="currentSong.image" alt="">
                        </div>
                    </div>
                    <div class="playing-lyric-wrapper">
                        <div class="palying-lric"></div>
                    </div>
                </div>
                <div class="middel-r"></div>
            </div>
            <div class="bottom">
                <div class="dot-wrapper">
                    <div class="dot"></div>
                    <div class="dot"></div>
                </div>
                <div class="progress-wrapper">
                    <span class="time time-l">00:00</span>
                    <div class="progress-bar-wrapper">
                        <progress-bar></progress-bar>
                    </div>
                    <span class="time time-r">00:00</span>
                </div>
                <div class="operator">
                     <div class="icon i-left">
                         <i class="iconfont icon-suijibofang"></i>
                     </div>
                    <div class="icon i-left" >
                         <i class="iconfont icon-ai10"></i>
                    </div>
                    <div class="icon i-center" >
                         <i :class="playicon" @click="togglePlaying"></i>
                    </div>
                    <div class="icon i-right" >
                         <i class="iconfont icon-ai09"></i>
                    </div>
                    <div class="icon i-right">
                         <i class="iconfont icon-iconset0194"></i>
                    </div>
                </div>
            </div>
        </div>
        </transition>
        <transition name="mini">
            <div class="mini-player" v-show="!fullScreen" >
                <div class="icon" @click="fullscreen" :class="csCls">
                    <img :src="currentSong.image" width="100%" height="100%" alt="">
                </div>
                <div class="text">
                    <h2 class="name" v-html="currentSong.name"></h2>
                    <p class="desc" v-html="currentSong.singer"></p>
                </div>
                <div class="control">
                    <i :class="playicon" @click="togglePlaying"></i>
                </div>
                <div class="control">
                    <i class="iconfont icon-iconset0194"></i>
                </div>
        </div>
        </transition>
        <audio ref="audio" :src="currentSong.url"></audio>
    </div>
</template>
<script>
import { mapGetters ,mapMutations} from 'vuex'
import ProgressBar from 'base/progress-bar/progress-bar'

import animations from 'create-keyframe-animation'

export default {
    computed:{
        csCls(){
            return this.playing ? 'play' : 'play pause'
        },
        playicon(){
            return this.playing ? 'iconfont icon-bofangqi-zanting':'iconfont icon-bofangqi-bofang'
        },
        ...mapGetters([
            'fullScreen',
            'playList',
            'currentSong',
            'playing'
        ])
    },
    components:{
        ProgressBar,
    },
    methods:{
        togglePlaying(){
            this.setPlayState(!this.playing)
        },
        back(){
            this.setFullScreen(false)
        },
        fullscreen(){
            this.setFullScreen(true)
        },
        enter(el,done){
            const {x,y,scale} = this._getLocation()

            let animation = {
                0:{
                    transform:`translate3d(${x}px,${y}px,0) scale(${scale})`
                },
                60:{
                     transform: `translate3d(0,0,0) scale(1.1)`
                },
                100:{
                     transform: `translate3d(0,0,0) scale(1)`
                }
            }
            animations.registerAnimation({
                name:'move',
                animation,
                presets:{
                    duration: 400,
                    easing: 'linear'
                }
            })

            animations.runAnimation(this.$refs.cdWrapper, 'move', done)
        },
        afterEnter(){
             animations.unregisterAnimation('move')
             this.$refs.cdWrapper.style.animation = ''
        },
        leave(el,done){
            const {x,y,scale} = this._getLocation()
            this.$refs.cdWrapper.style.transition="all 0.4s"
            this.$refs.cdWrapper.style.transform=`translate3d(${x}px,${y}px,0) scale(${scale})`
            this.$refs.cdWrapper.addEventListener('transitionend',done)

        },
        afterLeave(){
            this.$refs.cdWrapper.style.transition=''
            this.$refs.cdWrapper.style.transform=''
        },
        _getLocation(){
            const paddingTop = 85;
            const paddingLeft = 40;
            const paddingBottom = 30;
            const targetWidth = 40;
            const width = window.innerWidth * 0.8
            const scale = targetWidth/width
            const x = -(window.innerWidth / 2 - paddingLeft)
            const y = window.innerHeight - paddingTop - width / 2 - paddingBottom
            return {
                x,
                y,
                scale
            }
        },
        ...mapMutations({
            setFullScreen:'SET_FULL_SCREEN',
            setPlayState:'SET_PLAYING_STATE'
        })
    },
    mounted() {
        console.log(this.currentSong);
    },
    watch:{
        currentSong(){
            this.$nextTick(()=>{
                 this.$refs.audio.play()
            })
        },
        playing(newplay){
            this.$nextTick(()=>{
                const audo = this.$refs.audio
                newplay ? audo.play() : audo.pause()
            })
        }
    },
    
}
</script>
<style lang="less" scoped>
.player{
    >.normal-player{
        position: fixed;
        left:0;
        right:0;
        top:0;
        bottom:0;
        z-index:100;
        background-color: #222;
        >.background{
            position: absolute;
            top:0;
            bottom:0;
            width: 100%;
            height: 100%;
            z-index: -1;
            opacity: .6;
            filter: blur(20px);
        }
        >.top{
            position: relative;
            margin-bottom: 25px;
            >.back{
                position: absolute;
                top:0;
                left:6px;
                z-index:50;
                .icon-bofangqishouqi{
                    display:block;
                    padding:9px;
                    font-size:24px;
                    color:orangered;
                }
            }
            >.title{
                width: 70%;
                margin: 0 auto;
                line-height: 40px;
                text-align: center;
                font-size: 16px;
                color:#fff;
            }
            >.subtitle{
                line-height: 20px;
                text-align: center;
                font-size: 14px;
                color:#fff;
            }
        }
        >.middle{
            position: absolute;
            top:80px;
            width:100%;
            bottom:170px;
            white-space: nowrap;
            font-size:0;
            >.middle-l{
                display:inline-block;
                vertical-align: top;
                position:relative;
                width:100%;
                height:0;
                padding-top:80%;
                >.cd-wrapper{
                    position:absolute;
                    top:0;
                    left:10%;
                    width:80%;
                    height: 100%;
                    >.cd{
                        height: 100%;
                        position: relative;
                        width:100%;
                        box-sizing: border-box;
                        border:10px solid rgba(255,255,255,.1);
                        border-radius: 50%;
                        >.image{
                            position: absolute;
                            top:0;
                            left:0;
                            width:100%;
                            height:100%;
                            border-radius: 50%;
                        }
                        &.play{
                        animation: cdCls 20s linear infinite;
                        }
                        &.pause{
                            animation-play-state: paused
                        }
                    }
                    
                }

            }
        }
        >.bottom{
            position: absolute;
            bottom:10px;
            width:100%;
            >.dot-wrapper{
                 font-size: 0;
                 text-align: center;
                >.dot{
                height: 8px;
                width: 8px;
                margin:0 4px;
                border-radius: 50%;
                display: inline-block;
                vertical-align: middle;
                background-color: #fff;
                }
            }
            >.operator{
                display:flex;
                align-items: center;
                padding:10px 0;
                >.icon{
                    flex:1;
                    >.iconfont{
                        font-size:30px;
                        color:orange;
                    }
                    &.i-left{
                            text-align: right;
                        }
                    &.i-center{
                        padding:0 20px;
                        text-align: center;
                    }
                    &.i-right{
                        text-align: left;
                    }
                }
            }
            >.progress-wrapper{
                display: flex;
                align-items: center;
                width:80%;
                margin:0 auto;
                padding:10px 0;
                .progress-bar-wrapper{
                 flex: 1
                }
                >.time{
                    color:#fff;
                    font-size: 12px;
                    flex: 0 0 40px;
                    line-height: 30px;
                    width:40px;
                }
            &.time-l{
                text-align: left;
            }
            &.time-r{
                text-align:right;
            }
            }
        }
        &.normal-enter-active,&.normal-leave-active{
            transition: all .4s;
            .top,.bottom{
                transition: all .4s cubic-bezier(0.86, 0.18, 0.82, 1.32);
            }
        }
        &.normal-enter,&.normal-leave-to{
            opacity: 1;
            .top{
                transform: translate3d(0,-100%,0)
            }
            .bottom{
                transform: translate3d(0,100%,0)
            }
        }
    }
    >.mini-player{
        display:flex;
        position: fixed;
        align-items: center;
        left:0;
        bottom:0;
        z-index: 150;
        width: 100%;
        height: 60px;
        background-color: #333;
        color:#fff;
        >.icon{
          flex: 0 0 40px;
          width:40px;
          padding:0 10px 0 20px;
          img{
              border-radius: 50%;
          }
          &.play{
              animation: cdCls 20s linear infinite;
          }
          &.pause{
              animation-play-state: paused
          }
        }
        >.text{
            font-size:12px;
            display:flex;
            flex-direction: column;
            justify-content: center;
            flex:1;
            line-height: 20px;
            overflow: hidden;
            .name{
                font-size:14px;
            }
            .desc{
                color:#ccc;
            }
        }
        .control{
            flex: 0 0 30px;
            width: 30px;
            padding: 0 10px;
            font-size: 30px;
            color: orange;
            >.iconfont{
            font-size: 32px;
            }
            
        }
        &.mini-enter-active,&.mini-leave-active{
            transition: all .3s;
        }
        &.mini-enter,&mini-leave-to{
            opacity: 0;
        }
        
    }
}
@keyframes cdCls {
    0% {
        transform: rotateZ(0deg)
    }
    100% {
        transform: rotateZ(360deg)
    }
}

</style>

