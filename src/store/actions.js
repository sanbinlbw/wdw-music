//暴露给用户使用
const actions = {
    // 保存播放状态
    saveIsPlaying({ commit }, payload) {
        commit('saveIsPlaying', payload);
    },
    // 保存用户信息
    saveUserInfo({ commit }, payload) {
        commit('saveUserInfo', payload)
    },
    // 保存用户歌单
    savePersonalList({ commit }, payload) {
        commit('savePersonalList', payload)
    },
    //添加到当前播放列表
    unshiftPlayList({ commit }, payload) {
        commit('unshiftPlayList', payload)
    },
    pushPlayList({ commit }, payload) {
        commit('pushPlayList', payload)
    },
    // 添加到历史记录播放列表
    unshiftHisMusicList({ commit }, payload) {
        commit('unshiftHisMusicList', payload)
    },

    // 添加到播放过的歌曲歌单(避免上一首或者随机播放播放到重复的歌曲)
    pushHasPlayList({ commit }, payload) {
        commit('pushHasPlayList', payload)
    },

    // 删除当前列表歌曲
    deletePlayListSong({ commit }, payload) {
        commit('deletePlayListSong', payload)
    },

    // 删除历史列表歌曲
    deleteHisListSong({ commit }, payload) {
        commit('deleteHisListSong', payload)
    },

    // 删除已经播放列表歌曲
    deleteHasListSong({ commit }, payload) {
        commit('deleteHasListSong', payload)
    },

    // 清空歌单
    deleteAllList({ commit }) {
        commit('deleteAllList')
    },
    // 播放所有歌曲
    playAllSong({ commit }, payload) {
        commit('playAllSong', payload)
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
    // 让播放过的歌曲等于当前歌单
    sameHasAndPlay({ commit }) {
        commit('sameHasAndPlay')
    },
    // 保存当前搜索信息
    saveSearchInfo({ commit }, payload) {
        commit('saveSearchInfo', payload)
    },
    // 改变当前加载状态
    changeIsLoading({ commit }, payload) {
        commit('changeIsLoading', payload)
    },
    // 保存开始和结束时间
    saveAur({ commit }, payload) {
        commit('saveAur', payload)
    },
    // 保存进度条当前进度
    saveNowDuration({ commit }, payload) {
        commit('saveNowDuration', payload)
    },
    // 保存搜索历史
    saveSearchHistory({ commit }, payload) {
        commit('saveSearchHistory', payload)
    },
    // 删除单个历史标签
    deleteSearchHistory({ commit }, payload) {
        commit('deleteSearchHistory', payload)
    },
    // 删除所有历史标签
    deleteAllSearchHistory({ commit }) {
        commit('deleteAllSearchHistory')
    },
    // 是否显示登录面板
    changeShowLogin({ commit }, payload) {
        commit('changeShowLogin', payload)
    }
}
export default actions