<template>
    <div class="singer">
        singer
    </div>
</template>
<script>
import { getSingerList } from 'api/singer'
import { ERR_OK } from 'api/config'
import Singer from 'common/singer'

const HOT_SINGER_LEN = 10
const HOT_NAME = '热门'
    export default {
        data(){
            return {
                singerList:[]
            }
        },
         methods:{
            _getSingerList(){
                getSingerList().then((res)=>{
                    if(res.code == ERR_OK){
                        this.singerList=res.data.list;
                    }
                    console.log(this._normalizeSinger(this.singerList));
                })
            },
            _normalizeSinger(list){
                console.log(this.singerList);
                
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
            }
        },
        created(){
            this._getSingerList();
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