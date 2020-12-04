<template>
  <div class="newSong">
    <!-- 最新音乐 -->
    <el-row :gutter="10">
        <el-col :span="8" v-for="(item,index) in newSongList" :key="index" style="margin-bottom: 30px;">
            <div id="newSongDetail">
                <!-- 音乐封面 -->
                <el-image :src="item.picUrl" fit="fill" style="width: 25%;height: 25%;cursor: pointer;"></el-image>
                <!-- 音乐名字 -->
                <div id="newSongIntro">
                    <span style="color: #000000;cursor: pointer;">{{item.name}}</span>
                </div>
                <div id="author">
                    <img src="@/assets/image/SQ.jpg" alt="" style="margin-bottom: -2px;">
                    <!-- 作者名 -->
                    <span style="margin-left: 5px;cursor: pointer;;">{{item.song.artists[0].name}}</span>
                </div>
                <!-- 播放键 -->
                <div style="position: absolute;top: 32%;left: 9%;">
                    <img src="@/assets/image/play_1.svg" alt="" id="playImg">
                  </div>
            </div>
        </el-col>
      </el-row>
  </div>
</template>

<script>
    export default {
        name: 'newSong',
        props: {
            newSongList: Array
        },
        components: {},
        data() {
            return {

            }
        }
    }
</script>

<style scoped>
    #newSongDetail {
        position: relative;
        width: 100%;
    }
    
    #newSongIntro {
        position: absolute;
        opacity: 0.9;
        top: 12%;
        left: 28%;
    }
    
    #newSongIntro:hover,
    #author:hover {
        opacity: 1;
    }
    
    #newSongDetail:hover {
        cursor: pointer;
        background-color: #eaeaea;
    }
    
    #author {
        position: absolute;
        opacity: 0.9;
        bottom: 16%;
        left: 28%;
    }
    
    #playImg {
        width: 30px;
        height: 30px;
        border-radius: 100%;
        background: #f2f3f4;
    }
    
    #playImg:hover {
        cursor: pointer;
        opacity: 0.8;
    }
</style>