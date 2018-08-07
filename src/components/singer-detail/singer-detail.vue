<template>
    <transition name="slide">
       <musci-list v-if="song.length" :songs="song" :title="title" :bgImage="bgImage"></musci-list>
    </transition>
</template>
<script>
import { mapGetters } from 'vuex'
import { SingerSongList } from 'api/singer'
import { ERR_OK } from 'api/config'
import { createSong } from 'common/song'

import MusciList from '../musci-list/music-list'
export default {
    data(){
        return {
            song:[]
        }
    },
    computed:{
        title(){
            return this.singer.name
        },
        bgImage(){
            return this.singer.avatar
        },
        ...mapGetters([
            'singer'
        ])
    },
    methods:{
        _getSingerSongList(){
            if(!this.singer.id){
                this.$router.push('/singer');
                return ;
            }
            SingerSongList(this.singer.id).then(res=>{
                if(res.code == ERR_OK){
                    this.song = this._normalizeSongs(res.data.list)
                }
            })
        },
        _normalizeSongs(list){
            let ret = []
            list.forEach(item => {
                let { musicData } = item;
                if(musicData.songid && musicData.albummid ){
                    ret.push(createSong(musicData));
                }
            });
            return ret;
        }
    },
    created() {
        this._getSingerSongList()
    },
    components:{
        MusciList
    }
}
</script>
<style lang="less" scoped>
.slide-enter-active,.slide-leave-active{
    transition: all .3s;
}
.slide-enter,.slide-leave-to{
    transform: translate3d(100%,0,0)
}
</style>

