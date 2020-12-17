//暴露给用户使用
const actions = {
    // 保存播放状态
    saveIsPlaying({ commit }, payload) {
        commit('saveIsPlaying', payload);
    },

    // 保存历史记录播放列表
    saveHisMusicList({ commit }, payload) {
        commit('saveHisMusicList', payload)
    },

    // 保存播放过的歌曲歌单(避免上一首或者随机播放播放到重复的歌曲)
    saveHasPlayList({ commit }, payload) {
        commit('saveHasPlayList', payload)
    },

    // 保存当前播放模式
    savePlayOrd({ commit }, payload) {
        commit('savePlayOrd', payload)
    },
    // 保存当前正在播放的音乐路径
    saveMusicUrl({ commit }, payload) {
        commit('saveMusicUrl', payload)
    },
    // 保存当前正在播放的音乐细节
    saveMusicDetail({ commit }, payload) {
        commit('saveMusicDetail', payload)
    },
    // 保存当前正在播放的歌曲id
    saveSongId({ commit }, payload) {
        commit('saveSongId', payload)
    },
}
export default actions