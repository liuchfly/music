<template>
    <div class="singer">
        <list-view :data="singerList" @select="selectSinger"></list-view>
        <router-view></router-view>
    </div>
</template>
<script>
import { getSingerList } from 'api/singer'
import { ERR_OK } from 'api/config'
import Singer from 'common/singer'
import ListView from 'base/listview/listview'
import { mapMutations } from 'vuex'
const HOT_SINGER_LEN = 10
const HOT_NAME = '热门'
    export default {
        data(){
            return {
                singerList:[]
            }
        },
         methods:{
             selectSinger(item){
                 this.$router.push({
                     path:`/singer/${item.id}`
                 })
                 this.setSinger(item)
             },
            _getSingerList(){
                getSingerList().then((res)=>{
                    if(res.code == ERR_OK){
                        this.singerList=this._normalizeSinger(res.data.list);
                    }
                })
            },
            _normalizeSinger(list){
                let map = {
                    hot:{
                        title:HOT_NAME,
                        item:[]
                    }
                }
                list.forEach((item,index) => {
                    if (index < HOT_SINGER_LEN) {
                        map.hot.item.push(new Singer({
                            id:item.Fsinger_mid,
                            name:item.Fsinger_name
                        }))
                    }
                    const key = item.Findex;
                    if (!map[key]) {
                        map[key] = {
                            title:key,
                            item:[]
                        }
                    }
                    map[key].item.push(new Singer({
                        id:item.Fsinger_mid,
                        name:item.Fsinger_name
                    }))
                })

                let ret = [];
                let hot = [];
                for(let key in map){
                    let val = map[key]
                    // console.log(key)
                    if (val.title.match(/[a-zA-Z]/)) {
                        ret.push(val)
                    } else if (val.title === HOT_NAME) {
                        hot.push(val)
                    }
                }

                ret.sort((a,b)=>{
                    return a.title.charCodeAt(0)-b.title.charCodeAt(0);
                })
                return hot.concat(ret);
            },
            ...mapMutations({
                setSinger:'SET_SINGER'
            })
        },
        created(){
            this._getSingerList();
        },
        components:{
            ListView
        }
   
    }
</script>
<style lang="less" scoped>
.singer{
    position: absolute;
    top:88px;
    bottom:0;
    width:100%;
}
</style>