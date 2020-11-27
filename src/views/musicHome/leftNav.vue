<template>
  <div class="leftNav">
     <el-col>
    <el-menu
      :router="true"
      active-text-color = '#000000'
      default-active="/musicHome/findMusic/personRecom"
      class="el-menu-vertical-demo"
      text-color="#5c5c5c"
      @open="handleOpen"
      @close="handleClose">
      <p class="leftNavFont">推荐</p>
      <div>
      <el-menu-item index="/musicHome/findMusic/personRecom">
        <i class="iconfont icon-music"></i>
        <span slot="title">发现音乐</span>
      </el-menu-item>
      <el-menu-item index="/musicHome/recomVideo">
        <i class="iconfont icon-video"></i>
        <span slot="title">推荐视频</span>
      </el-menu-item>
      </div>
      <p class="leftNavFont">我的音乐</p>
      <div>
        <el-menu-item index="/musicHome/myCloudMusic">
            <i class="iconfont icon-yun"></i>
            <span slot="title">我的音乐云盘</span>
          </el-menu-item>
      </div>
      <p class="leftNavFont">创建的歌单</p>
      <div>
        <el-menu-item index="/musicHome/myFavoriteMusic">
            <i class="iconfont icon-heart"></i>
            <span slot="title">我喜欢的音乐</span>
          </el-menu-item>
      </div>
    </el-menu>
</el-col>
</div>
</template>

<script>
    export default {
        name: 'leftNav',
        components: {},
        data() {
            return {

            }
        },
        methods: {
            handleOpen(key, keyPath) {
                console.log(key, keyPath);
            },
            handleClose(key, keyPath) {
                console.log(key, keyPath);
            }
        },
    }
</script>

<style scoped>
    .leftNavFont {
        opacity: 0.5;
        font-weight: 50;
        font-size: 13px;
        margin-left: 10px;
    }
    
    .iconfont {
        margin-right: 10px;
    }
    
    .el-menu-item.is-active {
        background-color: #e6e7ea !important;
    }
    
    .el-menu-item:hover {
        background: #e6e7ea !important;
        color: #000000 !important;
    }
</style>