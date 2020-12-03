<template>
  <div class="musicHome">
    <el-container>
      <el-header>
        <img src="../assets/image/demo.svg" alt="" id="musicDemo">
        <span>似音流年</span>
        <div id="searchDiv">
          <el-input style="opacity: 0.5;" placeholder="请输入歌曲名或歌手名" size="mini"/>
          <i class="elsearch el-icon-search" @click="search"></i>
        </div>
        <loginBar style="position: absolute;right: 5%;"/>
      </el-header>
      <el-container>
          <!-- 左部导航栏 -->
        <el-aside width="250px"><leftNav/></el-aside>
        <!-- 展示路由 -->
        <el-main><router-view/></el-main>
      </el-container>
    </el-container>
    <!-- <div class="musicPlay">
        播放器
    </div> -->
  </div>
</template>

<script>
    import leftNav from '@/views/musicHome/leftNav'
    import loginBar from '@/views/musicHome/loginBar'
    export default {
        name: 'musicHome',
        components: {
            leftNav,
            loginBar
        },
        data() {
            return {

            }
        },
        methods: {
            search() {
                console.log('search');
            }
        },
    }
</script>

<style>
    .el-header {
        display: flex;
        position: relative;
        background: #c62f2f;
        padding-top: 5px;
    }
    
    #musicDemo {
        width: 40px;
        height: 40px;
        margin-top: 5px;
        margin-left: 20px;
    }
    
    .el-header span {
        width: 100px;
        margin-left: 10px;
        margin-top: 15px;
        font-weight: 500;
        font-size: 20px;
        color: #ffffff;
    }
    /* 搜索框 */
    
    #searchDiv {
        position: relative;
        width: 305px;
        margin-top: -10px;
    }
    
    .el-header .el-input__inner {
        opacity: 0.5;
        margin-top: 25px;
        margin-left: 50px;
        width: 225px;
        height: 23px;
        border-radius: 12px;
    }
    
    .elsearch {
        position: absolute;
        right: 13%;
        top: 45%;
        cursor: pointer;
        opacity: 0.5;
        color: aliceblue;
    }
    /* 音乐播放栏 */
    
    .musicPlay {
        position: fixed;
        bottom: 0;
        width: 100%;
        height: 70px;
        background: #f6f6f8;
    }
</style>