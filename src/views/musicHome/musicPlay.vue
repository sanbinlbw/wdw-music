<template>
    <div class="musicPlay">
        <audio :src="musicUrl" autoplay class="playMusicAudio" ref="audio"></audio>
        <div id="audioFunc">
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
            <div id="backSong"><i class="iconfont icon-shangyishou" style="font-size: 18px;"></i></div>
            <div>
                <div id="pause" v-show="isPlaying" @click="pauseSong"><i class="iconfont icon-zanting" style="font-size: 18px;"></i></div>
                <div id="play" v-show="!isPlaying" @click="playSong"><i class="iconfont icon-bofang" style="font-size: 30px;"></i></div>
            </div>
            <div id="nextSong"><i class="iconfont icon-xiayishou" style="font-size: 18px;"></i></div>
            <div id="album"><span style="font-size: 15px;">词</span></div>
        </div>
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
                playOrd: 0
            }
        },
        methods: {
            // 播放音乐
            playSong() {
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
        height: 90px;
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
</style>