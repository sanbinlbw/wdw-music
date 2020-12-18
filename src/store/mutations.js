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

    // 添加当前播放列表
    unshiftPlayList(state, playList) {
        state.playList.unshift(playList);
    },

    // 添加历史记录播放列表
    unshiftHisMusicList(state, hisMusicList) {
        state.hisMusicList.unshift(hisMusicList);
    },

    // 删除当前播放歌曲
    deletePlayListSong(state, songId) {
        for (let song of state.playList) {
            if (song.id === songId) {
                let index = state.playList.indexOf(song);
                if (index !== -1) {
                    state.playList.splice(index, 1);
                    break;
                }
            }
        }
    },

    // 删除历史播放歌曲
    deleteHisListSong(state, songId) {
        for (let song of state.hisMusicList) {
            if (song.id === songId) {
                let index = state.hisMusicList.indexOf(song);
                if (index !== -1) {
                    state.hisMusicList.splice(index, 1);
                    break;
                }
            }
        }
    },

    // 删除已经播放歌曲
    deleteHasListSong(state, songId) {
        for (let song of state.hasPlayList) {
            if (song.id === songId) {
                let index = state.hasPlayList.indexOf(song);
                if (index !== -1) {
                    state.hasPlayList.splice(index, 1);
                    break;
                }
            }
        }
    },

    // 清空歌单
    deleteAllList(state) {
        //当前播放列表
        state.playList = [];
        //历史播放列表
        state.hisMusicList = [];
        //当前播放音乐url
        state.musicUrl = "";
        //当前播放歌曲详情
        state.musicDetail = {
            al: {
                name: "",
                picUrl: "",
            },
            ar: [""],
            alia: {
                name: "",
            },
            name: "",
        };
    },

    // 保存播放过的歌曲歌单(避免上一首或者随机播放播放到重复的歌曲)
    pushHasPlayList(state, hasPlayList) {
        state.hasPlayList.push(hasPlayList);
    },

    // 让播放过的歌曲等于当前歌单
    sameHasAndPlay(state) {
        state.hasPlayList = [...state.playList]
    },

    // 保存当前播放模式
    savePlayOrd(state, playOrd) {
        state.playOrd = playOrd;
    },
    // 保存当前正在播放的音乐路径
    saveMusicUrl(state, musicUrl) {
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