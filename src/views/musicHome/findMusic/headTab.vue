<template>
  <div class="headTab">
    <el-menu default-active="/musicHome/findMusic/personRecom" class="el-menu-demo" mode="horizontal" :router="true">
  <el-menu-item index="/musicHome/findMusic/personRecom">个性推荐</el-menu-item>
  <el-menu-item index="/musicHome/findMusic/songList">歌单</el-menu-item>
  <el-menu-item index="/musicHome/findMusic/playList">排行榜</el-menu-item>
  <el-menu-item index="/musicHome/findMusic/singerList">歌手</el-menu-item>
  <el-menu-item index="/musicHome/findMusic/newSong">最新音乐</el-menu-item>
</el-menu>
  </div>
</template>

<script>
    export default {
        name: 'headTab',
        components: {},
        data() {
            return {

            }
        }
    }
</script>

<style scoped>
    /* 点击出来的下划线进行修改 */
    
    .el-menu-item.is-active {
        border-color: #ec4141;
        font-size: 20px;
        font-weight: 400;
    }
    /* 整体的下划线进行隐藏 */
    
    .el-menu.el-menu--horizontal {
        /* border-bottom: none; */
    }
</style>