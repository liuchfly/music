export default class Song {
    constructor({id,mid,singer,name,album,duration,image,url}){
        this.id = id
        this.mid = mid
        this.singer= singer
        this.name = name
        this.album = album
        this.duration = duration
        this.image  = image
        this.url = url
    }
}


export function createSong(musicData){
    return new Song({
        id: musicData.songid,
        mid: musicData.songmid,
        singer: filterSinger(musicData.singer),
        name: musicData.songname,
        album: musicData.albumname,
        duration: musicData.interval,
        image: `https://y.gtimg.cn/music/photo_new/T002R300x300M000${musicData.albummid}.jpg?max_age=2592000`,
        url: `http://dl.stream.qqmusic.qq.com/C400${musicData.songmid}.m4a?vkey=6235B869BC2B71FD8102CC5B71562878CDE3BAD01D87A9ACAC4D0613CC4341A27058A3AEFEBE2E4F47AB5C7FA9932794C1966D0136C13F47&guid=1405042184&uin=0&fromtag=66`
    })
}

function filterSinger(singer) {
    let ret = []
    if (!singer) {
        return ''
    }
    singer.forEach((s) => {
        ret.push(s.name)
    })
    return ret.join('/')
}