<template>
    <div class="song-list">
        <ul>
            <li v-for="song in songs" :key="song.id" class="item">
                <div class="content">
                    <h2 class="name">{{ song.name }}</h2>
                    <p class="desc">{{ getDesc(song) }}</p>
                </div>
            </li>
        </ul>
    </div>
</template>
<script>
export default {
    props:{
        songs:{
            type:Array,
            default:[]
        }
    },
    methods:{
        getDesc(song){
            return `${song.singer} 。${song.album}`
        }
    },
    created(){
        
    }
}
</script>
<style lang="less" scoped>
.song-list{
    .item{
        display: flex;
        align-items: center;
        box-sizing: border-box;
        height: 60px;
        font-size: 14px;
        color:#eee;
        padding-left: 20px;
        .content{
            flex:1;
            line-height: 20px;
            overflow: hidden;
            .name{
                font-size: 16px;
            }
            .desc{
                margin-top: 5px;
                color:darkgoldenrod;
            }
        }
    }
}
</style>


