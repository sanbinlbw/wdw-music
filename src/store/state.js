const state = {
    // 是否登录
    loginStatu: null,
    // 用户信息
    userInfo: null,
    // 歌手信息
    singer: {},
    // 播放状态
    isPlaying: false,
    // 播放列表
    playList: [],
    //历史歌曲播放列表
    hisMusicList: [],
    //播放过的歌曲歌单(避免上一首或者随机播放播放到重复的歌曲)
    hasPlayList: [],
    //判断播放顺序模式
    playOrd: 0,
    //当前播放歌曲url
    musicUrl: "",
    //当前播放歌曲详情
    musicDetail: {
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
    songId: "",
    // 搜索历史
    // searchHistory: getSearch(),
}

export default state