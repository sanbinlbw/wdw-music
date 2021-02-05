const mutations = {
    // 保存当前登录状态
    // export const saveLoginStatu = (state, pathName) => {
    //   state.pathName = pathName;
    // };

    // 保存当前用户信息
    saveUserInfo(state, userInfo) {
        state.userInfo = userInfo;
    },
    // 读取当前用户歌单列表
    savePersonalList(state, personalList) {
        state.personalList = personalList
    },

    // 是否展示登录界面
    changeShowLogin(state, showLogin) {
        state.showLogin = showLogin
    },

    // 保存播放状态
    saveIsPlaying(state, isPlaying) {
        state.isPlaying = isPlaying;
    },

    // 添加当前播放列表
    unshiftPlayList(state, playList) {
        state.playList.unshift(playList);
    },
    pushPlayList(state, playList) {
        state.playList.push(playList);
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
        // 当前播放状态变成暂停
        state.isPlaying = false;
        // 当前播放歌曲id
        state.songId = "";
        // 当前播放列表
        state.playList = [];
        // 历史播放列表
        state.hisMusicList = [];
        // 已经播放列表
        state.hasPlayList = [];
        // 当前播放音乐url
        state.musicUrl = "";
        // 可播放音乐范围
        state.playDur = [];
        // 当前播放歌曲详情
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
    // 播放全部
    playAllSong(state, list) {
        // 当前播放状态变成暂停
        state.isPlaying = true;
        // 清空已经播放歌单
        state.hasPlayList = [];
        // 当前播放歌曲id
        state.songId = list[0].id;
        // 当前播放列表
        state.playList = list;
        // 放入一个进入已经播放歌单
        state.hasPlayList.push(list[0])
            // 可播放音乐范围
        state.playDur = [];
        // 当前播放歌曲详情
        state.musicDetail = list[0]
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
    // 保存当前搜索信息
    saveSearchInfo(state, searchInfo) {
        state.searchInfo = searchInfo
    },
    // 修改当前加载状态
    changeIsLoading(state, isLoading) {
        state.isLoading = isLoading
    },
    // 保存开始时间和结束时间
    saveAur(state, slider) {
        state.slider = {}
        state.slider[slider[0]] = ''
        state.slider[slider[1]] = ''
        state.playDur = []
        state.playDur = slider
    },
    // 保存当前播放进度
    saveNowDuration(state, nowDuration) {
        state.nowDuration = nowDuration
    },
    // 保存搜索历史
    saveSearchHistory(state, searchHistory) {
        for (let searchHisInfo of state.searchHistory) {
            if (searchHisInfo === searchHistory) {
                let index = state.searchHistory.indexOf(searchHisInfo);
                if (index !== -1) {
                    state.searchHistory.splice(index, 1);
                    break;
                }
            }
        }
        state.searchHistory.unshift(searchHistory)
    },
    // 删除单个搜索历史标签
    deleteSearchHistory(state, searchHistory) {
        for (let searchHisInfo of state.searchHistory) {
            if (searchHisInfo === searchHistory) {
                let index = state.searchHistory.indexOf(searchHisInfo);
                if (index !== -1) {
                    state.searchHistory.splice(index, 1);
                    break;
                }
            }
        }
    },
    // 删除所有搜索历史
    deleteAllSearchHistory(state) {
        state.searchHistory = [];
    },
}
export default mutations