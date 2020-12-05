<template>
  <div class="recomSong">
    <!-- 推荐歌单 -->
    <el-row :gutter="40">
  <el-col :span="6" v-for="(item,index) in recomSongList" :key="index" style="margin-bottom: 40px;">
    <!-- 歌单封面 -->
    <div id="playDetail" @mouseover="addPlay(index)" @mouseleave="reducePlay">
        <el-image :src="item.picUrl" fit="fill" style="border-radius: 10px;box-shadow: grey 0px 0px 2px 2px;"></el-image>
        <!-- 播放量 -->
        <div style="color: white;position:absolute;top: 2%;right: 3%;">
            <i class="el-icon-headset"></i>
            {{item.playCount >= 10000 ? (item.playCount/10000).toFixed(0)+'万' : item.playCount}}
        </div>
        <!-- 鼠标停靠出现播放键 -->
        <div :class="{'playAppear':currentIndex === index,'playNone':currentIndex !== index}">
            <img src="@/assets/image/play_1.svg" alt="" id="playImg">
        </div>
    </div>
    <!-- 歌单介绍 -->
    <div class="playListIntro">
        <p id="playIntro">{{item.name}}</p>
    </div>
    </el-col>
</el-row>
  </div>
</template>

<script>
    export default {
        name: 'recomSong',
        components: {},
        props: {
            recomSongList: Array
        },
        data() {
            return {
                //鼠标悬停的判断
                currentIndex: -1,
            }
        },
        methods: {
            // 鼠标移入
            addPlay(index) {
                this.currentIndex = index
            },
            // 鼠标移出
            reducePlay() {
                this.currentIndex = -1
            }
        },
    }
</script>

<style scoped>
    .el-col {
        width: 20%;
    }
    /* 歌单介绍 */
    
    .playListIntro {
        height: 50px;
        overflow: hidden;
    }
    
    #playIntro {
        font-size: 15px;
        cursor: pointer;
        color: #373737;
        opacity: 0.9;
    }
    
    #playIntro:hover {
        opacity: 1;
        color: #000000;
    }
    /* 歌单封面 */
    
    #playDetail {
        display: inline-block;
        width: 100%;
        position: relative;
        cursor: pointer;
    }
    
    #playImg {
        display: inline-block;
        width: 35px;
        height: 35px;
        border-radius: 100%;
        background: #f2f3f4;
    }
    /* 播放键出现 */
    
    .playAppear {
        display: block;
        position: absolute;
        bottom: 5%;
        right: 5%;
        animation-name: play;
        animation-duration: 0.8s;
        animation-iteration-count: 1;
        animation-fill-mode: forwards;
    }
    /* 播放动画 */
    
    @keyframes play {
        0% {
            opacity: 0;
        }
        100% {
            opacity: 1;
        }
    }
    
    .playNone {
        display: none;
    }
</style>