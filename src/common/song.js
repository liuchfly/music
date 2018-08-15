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
        url: `http://dl.stream.qqmusic.qq.com/C400${musicData.songmid}.m4a?vkey=477870B435A99CAEA49D800CA71970128592B549C7DCDB1C75D02AD4A1A81C0BE14DE68D3D2E8B6127A16E048F94ECEB3E35DF999FD242D2&guid=1405042184&uin=0&fromtag=66`
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