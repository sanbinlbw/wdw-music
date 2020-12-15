<template>
    <div class="musicPlay">
        <audio :src="musicUrl" autoplay class="playMusicAudio" ref="audio" @canplay="getDuration" @timeupdate="durationUpdate"></audio>
        <div id="songDetail" v-show="musicDetail.al.picUrl !== ''">
            <!-- 歌曲封面 -->
            <el-image :src="musicDetail.al.picUrl" fit="fill" style="border-radius: 10%;height: 57px;width: 57px;"></el-image>
            <!-- 歌曲名 -->
            <div id="songName">
                <span style="color: #000000;cursor: pointer;margin-left: 10px;margin-right: 4px;">{{musicDetail.name}}</span>
                <span style="cursor: pointer;">{{!musicDetail.alia[0] ? '' : '(' + musicDetail.alia[0] + ')'}}</span>
            </div>
            <!-- 作者名 -->
            <div id="authorName">
                <span style="cursor: pointer;margin-left: 10px;font-size: 5px;">{{musicDetail.ar[0].name}}</span>
            </div>
        </div>
        <div id="audioFunc">
            <!-- 播放顺序 -->
            <div @click="changeOrd">
                <el-tooltip class="item" effect="light" content="顺序播放" placement="top" :open-delay="500">
                    <div id="playOrd" v-show="playOrd === 0"><i class="iconfont icon-liebiaoshunxu" style="font-size: 18px;"></i></div>
                </el-tooltip>
                <el-tooltip class="item" effect="light" content="列表循环" placement="top" :open-delay="500">
                    <div id="playOrd" v-show="playOrd === 1"><i class="iconfont icon-liebiaoxunhuan" style="font-size: 18px;"></i></div>
                </el-tooltip>
                <el-tooltip class="item" effect="light" content="单曲循环" placement="top" :open-delay="500">
                    <div id="playOrd" v-show="playOrd === 2"><i class="iconfont icon-danquxunhuan" style="font-size: 18px;"></i></div>
                </el-tooltip>
                <el-tooltip class="item" effect="light" content="随机播放" placement="top" :open-delay="500">
                    <div id="playOrd" v-show="playOrd === 3"><i class="iconfont icon-suijibofang" style="font-size: 18px;"></i></div>
                </el-tooltip>
            </div>
            <!-- 上一首歌曲 -->
            <div id="backSong" @click="getBackSong"><i class="iconfont icon-shangyishou" style="font-size: 18px;"></i></div>
            <!-- 播放与暂停 -->
            <div>
                <div id="pause" v-show="isPlaying" @click="pauseSong"><i class="iconfont icon-zanting" style="font-size: 18px;"></i></div>
                <div id="play" v-show="!isPlaying" @click="playSong"><i class="iconfont icon-bofang" style="font-size: 30px;"></i></div>
            </div>
            <!-- 下一首歌曲 -->
            <div id="nextSong" @click="getNextSong"><i class="iconfont icon-xiayishou" style="font-size: 18px;"></i></div>
            <!-- 歌词 -->
            <div id="album"><span style="font-size: 15px;">词</span></div>
        </div>
        <!-- 播放进度条 -->
        <span style="position: absolute;right: 72%;bottom: 12px;opacity: 0.7;">{{this.musicDuration | timeFormat}}</span>
        <div id="playSlider">
            <el-slider v-model="musicDuration" :max="musicAllDuration" :show-tooltip="false" @change="changeMusicDuration" @mousedown.native="isChange = true" @mouseup.native="isChange = false"></el-slider>
        </div>
        <span style="position: absolute;left: 72%;bottom: 12px;opacity: 0.7;">{{this.musicAllDuration | timeFormat}}</span>
        <div class="volume">
            <i class="iconfont icon-icon-test" v-show="volumeVal !== 0" @click="muteVolume" style="font-size: 25px;cursor: pointer;left: 66px;position: absolute;"></i>
            <i class="iconfont icon-jingyin" v-show="volumeVal === 0" @click="cancelMute" style="font-size: 29px;cursor: pointer;left: 65px;margin-top: -2px;position: absolute;"></i>
            <el-slider v-model="volumeVal" :max="100" :step="1" @change="changeVolume" style="position: absolute;top: -5px;right: 0px;width: 100px;"></el-slider>
        </div>
        <!-- 打开播放列表 -->
        <el-tooltip class="item" effect="light" content="打开播放列表" placement="top" :open-delay="500">
            <i class="iconfont icon-bofangliebiao" @click="isShowSongList" style="position: absolute;right: 45px;top: 30px;font-size: 24px;cursor: pointer;"></i>
        </el-tooltip>
    </div>
</template>

<script>
    export default {
        name: 'musicPlay',
        props: {
            musicUrl: String,
            musicDetail: Object
        },
        components: {},
        data() {
            return {
                // 判断当前是否在播放
                isPlaying: false,
                //判断播放顺序模式
                playOrd: 0,
                //歌曲总时长
                musicAllDuration: 0,
                // 歌曲当前时长
                musicDuration: 0,
                //判断是否被拖动
                isChange: false,
                //音量值
                volumeVal: 50,
                //当前音量
                nowVolume: 50,
            }
        },
        methods: {
            // 播放音乐
            playSong() {
                if (!this.musicUrl) {
                    const h = this.$createElement;
                    this.$message.error({
                        message: h('p', null, [
                            h('span', null, '列表中没有可播放的歌曲'),
                            h('i', {
                                style: 'color: red'
                            }, '')
                        ]),
                        offset: 280,
                        center: true,
                        showClose: true
                    });
                    return
                }
                this.isPlaying = true
                this.$emit('startPlaying')
                this.$refs.audio.play()
            },
            // 暂停音乐
            pauseSong() {
                this.isPlaying = false
                this.$emit('pausePlaying')
                this.$refs.audio.pause()
            },
            //变化播放模式
            changeOrd() {
                if (this.playOrd === 3) return this.playOrd = 0
                this.playOrd++
            },
            //获得播放歌曲总时长
            getDuration() {
                this.musicAllDuration = this.$refs.audio.duration
            },
            //更新当前时长
            durationUpdate() {
                if (this.isChange === true) return
                this.musicDuration = this.$refs.audio.currentTime
            },
            //鼠标拖拽松开时
            changeMusicDuration() {
                if (this.musicAllDuration === 0) {
                    const h = this.$createElement;
                    this.$message.error({
                        message: h('p', null, [
                            h('span', null, '列表中没有要播放的歌曲'),
                            h('i', {
                                style: 'color: red'
                            }, '')
                        ]),
                        offset: 280,
                        center: true,
                        showClose: true
                    });
                    return
                }
                this.$refs.audio.currentTime = this.musicDuration
                this.isChange = false
            },
            //音量改变时
            changeVolume() {
                this.nowVolume = this.volumeVal
                this.$refs.audio.volume = this.volumeVal / 100
            },
            //静音
            muteVolume() {
                this.volumeVal = 0
                this.$refs.audio.volume = this.volumeVal / 100
            },
            // 恢复静音
            cancelMute() {
                this.volumeVal = this.nowVolume
                this.$refs.audio.volume = this.volumeVal / 100
            },
            //展示当前播放歌单
            isShowSongList() {
                this.$emit('isShowSongList')
            },
            //获取下一首歌曲
            getNextSong() {
                this.$emit('getNextSong', this.playOrd)
            },
            //获取上一首歌曲
            getBackSong() {
                this.$emit('getBackSong')
            }
        },
    }
</script>

<style scoped>
    /* 音乐播放栏 */
    
    .musicPlay {
        position: fixed;
        box-shadow: 0 0 1px 1px #b9b5b5;
        bottom: 0;
        width: 100%;
        height: 80px;
        background: #f6f6f8;
    }
    /* 音乐操作 */
    
    #play,
    #pause {
        cursor: pointer;
        background: #ebebed;
        border-radius: 100%;
        /* width: 40px; */
        height: 40px;
        line-height: 40px;
        text-align: center;
    }
    
    #play:hover,
    #pause:hover {
        background: #ddddde;
    }
    
    #playOrd,
    #backSong,
    #nextSong {
        cursor: pointer;
        border-radius: 100%;
        height: 40px;
        line-height: 40px;
        text-align: center;
    }
    
    #playOrd:hover,
    #backSong:hover,
    #nextSong:hover,
    #album:hover {
        color: #ed6566;
    }
    
    #album {
        cursor: pointer;
        border-radius: 100%;
        height: 40px;
        line-height: 36px;
        text-align: center;
    }
    
    #audioFunc {
        display: grid;
        width: 280px;
        grid-template-columns: repeat(5, 1fr);
        column-gap: 20px;
        margin-top: 1%;
        margin-left: 50%;
        transform: translateX(-50%);
    }
    /* 播放条样式 */
    
    #playSlider {
        width: 43%;
        margin-top: -14px;
        margin-left: 50%;
        transform: translateX(-50%);
    }
    /* 歌曲详情样式 */
    
    #songDetail {
        position: absolute;
        top: 13px;
        left: 30px;
    }
    
    #songName {
        position: absolute;
        width: 160px;
        top: 4px;
        left: 60px;
        opacity: 0.9;
        white-space: nowrap;
        text-overflow: ellipsis;
        overflow: hidden;
        word-break: break-all;
        color: #949495;
    }
    
    #authorName {
        position: absolute;
        width: 160px;
        bottom: 7px;
        left: 60px;
        opacity: 0.8;
    }
    
    #songName:hover,
    #authorName:hover {
        opacity: 1;
    }
    /* 音量 */
    
    .volume {
        position: absolute;
        width: 200px;
        height: 20px;
        right: 105px;
        top: 30px;
    }
</style>