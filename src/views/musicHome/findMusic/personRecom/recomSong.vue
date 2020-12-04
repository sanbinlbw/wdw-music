<template>
  <div class="recomSong">
    <!-- 推荐歌单 -->
    <el-row :gutter="40">
  <el-col :span="4" v-for="(item,index) in recomSongList" :key="index" style="margin-bottom: 20px;">
    <!-- 歌单封面 -->
    <div id="playDetail">
        <el-image :src="item.picUrl" fit="fill"></el-image>
        <!-- 播放量 -->
        <div style="color: white;position:absolute;top: 2%;right: 3%;">
            <i class="el-icon-headset"></i>
                {{item.playCount >= 10000 ? (item.playCount/10000).toFixed(0)+'万' : item.playCount}}
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

            }
        },
        methods: {},
    }
</script>

<style scoped>
    /* 推荐歌单 */
    
    .el-row {
        margin-bottom: 20px;
        /* &:last-child {
      margin-bottom: 0;
    } */
    }
    
    .el-row :last-child {
        margin-bottom: 0;
    }
    
    .el-col {
        border-radius: 4px;
    }
    
    .bg-purple {
        background: #d3dce6;
    }
    
    .grid-content {
        border-radius: 4px;
        min-height: 36px;
    }
    
    .row-bg {
        padding: 10px 0;
        background-color: #f9fafc;
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
        width: 100%;
        position: relative;
        cursor: pointer;
    }
</style>