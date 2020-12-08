<template>
  <div class="musicHome">
    <el-container>
        <!-- 头部 -->
      <el-header>
        <img src="../assets/image/demo.svg" alt="" id="musicDemo">
        <span>似音流年</span>
        <div id="back">
            <i class="el-icon-arrow-left" @click="$router.go(-1)" style="cursor: pointer;"></i>
        </div>
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
        <el-main><router-view @setMusicUrl="setMusicUrl" /></el-main>
      </el-container>
    </el-container>
    <!-- 播放器 -->
    <musicPlay :musicUrl="musicUrl" ref="musicPlay"/>
  </div>
</template>

<script>
    import leftNav from '@/views/musicHome/leftNav'
    import loginBar from '@/views/musicHome/loginBar'
    import musicPlay from '@/views/musicHome/musicPlay'
    export default {
        name: 'musicHome',
        components: {
            leftNav,
            loginBar,
            musicPlay
        },
        data() {
            return {
                //歌曲url
                musicUrl: '',
                //歌曲详情
                musicDetail: {},
                //当前歌曲id
                songId: '',
                //当前歌单
                playList: [],
            }
        },
        methods: {
            search() {
                console.log('search');
            },
            //接受子组件传来的歌曲信息
            setMusicUrl(url, detail) {
                //接受子组件传来的数据
                this.musicUrl = url
                this.musicDetail = detail
                this.songId = detail.id
                this.$refs.musicPlay.isPlaying = true
                    //将播放的音乐id放入歌单
                this.playList.push(detail.id)
            },
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
    /* 回退键 */
    
    #back {
        width: 25px;
        height: 25px;
        text-align: center;
        line-height: 25px;
        margin-top: 13px;
        margin-left: 30px;
        color: #ffffff;
        background: rgba(77, 71, 71, 0.1);
        border-radius: 50%;
    }
</style>