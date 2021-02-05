const state = {
    // 是否登录
    loginStatu: null,
    // 用户信息
    userInfo: sessionStorage.getItem('userInfo') ? JSON.parse(sessionStorage.getItem('userInfo')) : null,
    // 私人歌单列表(需要登录)
    personalList: sessionStorage.getItem('personalList') ? JSON.parse(sessionStorage.getItem('personalList')) : [],
    // 是否打开登录面板
    showLogin: false,
    // 歌手信息
    singer: {},
    // 播放状态
    isPlaying: false,
    // 播放列表
    playList: sessionStorage.getItem('playList') ? JSON.parse(sessionStorage.getItem('playList')) : [],
    //历史歌曲播放列表
    hisMusicList: sessionStorage.getItem('hisMusicList') ? JSON.parse(sessionStorage.getItem('hisMusicList')) : [],
    //播放过的歌曲歌单(避免上一首或者随机播放播放到重复的歌曲)
    hasPlayList: sessionStorage.getItem('hasPlayList') ? JSON.parse(sessionStorage.getItem('hasPlayList')) : [],
    //判断播放顺序模式
    playOrd: sessionStorage.getItem('playOrd') ? JSON.parse(sessionStorage.getItem('playOrd')) : 0,
    //当前播放歌曲url
    musicUrl: sessionStorage.getItem('musicUrl') ? JSON.parse(sessionStorage.getItem('musicUrl')) : "",
    //当前播放歌曲详情
    musicDetail: sessionStorage.getItem('musicDetail') ? JSON.parse(sessionStorage.getItem('musicDetail')) : {
        al: {
            name: "",
            picUrl: "",
        },
        ar: [""],
        alia: {
            name: "",
        },
        name: "",
    },
    //当前歌曲id
    songId: sessionStorage.getItem('songId') ? JSON.parse(sessionStorage.getItem('songId')) : "",
    //歌曲当前进度
    nowDuration: 0,
    //当前搜索信息
    searchInfo: sessionStorage.getItem('searchInfo') ? JSON.parse(sessionStorage.getItem('searchInfo')) : "",
    //当前是否在加载数据
    isLoading: false,
    // 试听片段开始和结束时间
    slider: sessionStorage.getItem('slider') ? JSON.parse(sessionStorage.getItem('slider')) : {},
    playDur: sessionStorage.getItem('playDur') ? JSON.parse(sessionStorage.getItem('playDur')) : {},
    // 搜索历史
    searchHistory: sessionStorage.getItem('searchHistory') ? JSON.parse(sessionStorage.getItem('searchHistory')) : [],
}

export default state