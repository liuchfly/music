import { playMode } from 'common/config'
const state = {
    singer:{},
    playing:false,
    fullScreen:false,
    playList:[],
    sequenceList:[],
    mode: playMode.sequence,
    currentIndex:-1,
    isLogin:false
}
export default state