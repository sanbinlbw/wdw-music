<template>
    <div class="musicPlay">
        <audio :src="musicUrl" autoplay class="playMusicAudio" ref="audio" @canplay="getDuration" @timeupdate="durationUpdate"></audio>
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
            <div id="backSong"><i class="iconfont icon-shangyishou" style="font-size: 18px;"></i></div>
            <!-- 播放与暂停 -->
            <div>
                <div id="pause" v-show="isPlaying" @click="pauseSong"><i class="iconfont icon-zanting" style="font-size: 18px;"></i></div>
                <div id="play" v-show="!isPlaying" @click="playSong"><i class="iconfont icon-bofang" style="font-size: 30px;"></i></div>
            </div>
            <!-- 下一首歌曲 -->
            <div id="nextSong"><i class="iconfont icon-xiayishou" style="font-size: 18px;"></i></div>
            <!-- 歌词 -->
            <div id="album"><span style="font-size: 15px;">词</span></div>
        </div>
        <!-- 播放进度条 -->
        <span style="position: absolute;right: 72%;bottom: 12px;">{{this.musicDuration | timeFormat}}</span>
        <div id="playSlider">
            <el-slider v-model="musicDuration" :max="musicAllDuration" :show-tooltip="false" @change="changeMusicDuration" @mousedown.native="isChange = true" @mouseup.native="isChange = false"></el-slider>
        </div>
        <span style="position: absolute;left: 72%;bottom: 12px;">{{this.musicAllDuration | timeFormat}}</span>
    </div>
</template>

<script>
    export default {
        name: 'musicPlay',
        props: {
            musicUrl: String
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
                isChange: false
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
                this.$refs.audio.play()
            },
            // 暂停音乐
            pauseSong() {
                this.isPlaying = false
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
                if (this.musicAllDuration === 0) return
                this.$refs.audio.currentTime = this.musicDuration
                this.isChange = false
            },
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
        margin-top: -15px;
        margin-left: 50%;
        transform: translateX(-50%);
    }
</style>