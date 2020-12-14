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
    <musicPlay :musicUrl="musicUrl" :musicDetail="musicDetail" ref="musicPlay" @isShowSongList="isShowSongList" @startPlaying="startPlaying" @pausePlaying="pausePlaying" />
    <!-- 播放列表弹出层 -->
    <songTable ref="songTable" v-show="showSongList" :currentMusicList="currentMusicList" :playList="playList" :songId="songId" @playListSong="playListSong" @cleanPlayList="cleanPlayList" />
  </div>
</template>

<script>
    import leftNav from '@/views/musicHome/leftNav'
    import loginBar from '@/views/musicHome/loginBar'
    import musicPlay from '@/views/musicHome/musicPlay'
    import songTable from '@/views/musicHome/songTable'
    export default {
        name: 'musicHome',
        components: {
            leftNav,
            loginBar,
            musicPlay,
            songTable
        },
        data() {
            return {
                //当前播放歌曲url
                musicUrl: '',
                //当前播放歌曲详情
                musicDetail: {
                    al: {
                        name: '',
                        picUrl: '',
                    },
                    ar: [''],
                    alia: {
                        name: '',
                    },
                    name: ''
                },
                //最近歌曲播放列表
                currentMusicList: [],
                //当前歌曲id
                songId: '',
                //当前歌单
                playList: [],
                //是否显示歌单
                showSongList: false
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
                for (let song of this.playList) {
                    if (song.id === detail.id) {
                        const h = this.$createElement;
                        this.$message.error({
                            message: h('p', null, [
                                h('span', null, '列表中已存在该歌曲'),
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
                }
                this.playList.unshift(detail)
            },
            // 播放歌单里面的歌曲
            playListSong(musicId) {
                //接受子组件传来的数据
                this.$refs.musicPlay.isPlaying = true
                this.$refs.songTable.isPlaying = true
                this.getMusicUrl(musicId)
                this.getMusicDetail(musicId)
                this.songId = musicId
            },
            //根据id获取音乐url
            async getMusicUrl(musicId) {
                await this.$http.get('song/url', {
                    params: {
                        id: musicId
                    }
                }).then(res => {
                    this.musicUrl = res.data.data[0].url
                })
            },
            //根据id获取音乐详情
            async getMusicDetail(musicId) {
                await this.$http.get('song/detail', {
                    params: {
                        ids: musicId
                    }
                }).then(res => {
                    this.musicDetail = res.data.songs[0]
                })
            },
            //是否展示歌单
            isShowSongList() {
                this.showSongList = !this.showSongList
            },
            //清空当前歌单
            cleanPlayList() {
                //当前播放列表
                this.playList = []
                    //当前播放音乐url
                this.musicUrl = ''
                    //当前播放歌曲详情
                this.musicDetail = {
                    al: {
                        name: '',
                        picUrl: '',
                    },
                    ar: [''],
                    alia: {
                        name: '',
                    },
                    name: ''
                }
            },
            //调用子组件方法改变当前的播放状态
            startPlaying() {
                this.$refs.songTable.isPlaying = true
            },
            pausePlaying() {
                this.$refs.songTable.isPlaying = false
            }
        },
        created() {

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
    /* 滑块 */
    
    .el-slider__button {
        width: 10px !important;
        height: 10px !important;
        border: 2px solid rgb(198, 47, 47) !important;
    }
    
    .el-slider__runway {
        background: #c2c2c4;
    }
    
    .el-slider__bar {
        background-color: #ff4e4e;
    }
    
    .volume .el-slider__button {
        width: 5px !important;
        height: 5px !important;
        border: 1px solid #ec4141 !important;
        background: #ec4141;
    }
    
    .volume .el-slider__runway {
        background: #e6e6e8;
    }
</style>