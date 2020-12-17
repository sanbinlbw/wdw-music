const mutations = {
    // 保存当前登录状态
    // export const saveLoginStatu = (state, pathName) => {
    //   state.pathName = pathName;
    // };

    // 保存当前用户信息
    // export const saveUserInfo = (state, currDbSource) => {
    //   state.currDbSource = currDbSource;
    // };

    // 保存歌手信息
    // export const saveSinger = (state, currJobData) => {
    //   state.currJobData = null;
    //   state.currJobData = currJobData;
    // };

    // 保存播放状态
    saveIsPlaying(state, isPlaying) {
        state.isPlaying = isPlaying;
    },

    // 保存历史记录播放列表
    saveHisMusicList(state, hisMusicList) {
        state.hisMusicList = hisMusicList;
    },

    // 保存播放过的歌曲歌单(避免上一首或者随机播放播放到重复的歌曲)
    saveHasPlayList(state, hasPlayList) {
        state.hasPlayList = hasPlayList;
    },

    // 保存当前播放模式
    savePlayOrd(state, playOrd) {
        state.playOrd = playOrd;
    },
    // 保存当前正在播放的音乐路径
    savaMusicUrl(state, musicUrl) {
        state.musicUrl = musicUrl
    },
    // 保存当前正在播放的音乐细节
    saveMusicDetail(state, musicDetail) {
        state.musicDetail = musicDetail
    },
    // 保存当前正在播放的歌曲id
    saveSongId(state, songId) {
        state.songId = songId
    },

}
export default mutations