<template>
  <div class="personRecom">
      <!-- 轮播图 -->
      <div id="banner">
        <banner :bannerInfo="bannerInfo"></banner>
      </div>
      <!-- 推荐歌单 -->
      <el-divider content-position="left"><p style="font-size: 20px;">推荐歌单</p></el-divider>
      <div id="recomSong">
        <recomSong :recomSongList="recomSongList"></recomSong>
      </div>
      <!-- 独家放送 -->
      <el-divider content-position="left"><p style="font-size: 20px;">独家放送</p></el-divider>
      <div id="private">
        <privateRec :privateList="privateList"></privateRec>
      </div>
      <!-- 最新音乐 -->
      <el-divider content-position="left"><p style="font-size: 20px;">最新音乐</p></el-divider>
      <div id="newSong">
        <newSong :newSongList="newSongList"></newSong>
      </div>
      <!-- 推荐mv -->
      <el-divider content-position="left"><p style="font-size: 20px;">推荐MV</p></el-divider>
      <div id="mvRecom">
        <mvRecom :mvRecomList="mvRecomList"></mvRecom>
      </div>
  </div>
</template>

<script>
    import banner from './banner'
    import recomSong from './recomSong'
    import privateRec from './privateRec'
    import newSong from './newSong'
    import mvRecom from './mvRecom'
    export default {
        name: 'personRecom',
        components: {
            recomSong,
            banner,
            privateRec,
            newSong,
            mvRecom
        },
        data() {
            return {
                //轮播图列表
                bannerInfo: [],
                //推荐歌单列表
                recomSongList: [],
                // 独家放送列表
                privateList: [],
                // 最新音乐列表
                newSongList: [],
                //mv推荐列表
                mvRecomList: [],
            }
        },
        created() {
            // 获取轮播图
            this.getBannerInfo()
                // 获取推荐歌单
            this.getRecomSongList()
                // 获取独家放送
            this.getPrivateList()
                // 获取最新音乐
            this.getNewSongList()
                // 获取mv推荐
            this.getMvRecomList()
        },
        methods: {
            //获取轮播图数据
            getBannerInfo() {
                this.$http.get('banner').then(res => {
                    if (res.status !== 200) this.$message.error('轮播图获取失败')
                    this.bannerInfo = res.data.banners
                })
            },
            changeUrl() {

            },
            //获取推荐歌单
            getRecomSongList() {
                this.$http.get('/personalized', {
                    params: {
                        limit: 12
                    }
                }).then(res => {
                    this.recomSongList = res.data.result
                })
            },
            //获取独家放送
            getPrivateList() {
                this.$http.get('/personalized/privatecontent').then(res => {
                    this.privateList = res.data.result
                })
            },
            // 获取最新音乐
            getNewSongList() {
                this.$http.get('/personalized/newsong', {
                    params: {
                        limit: 12
                    }
                }).then(res => {
                    this.newSongList = res.data.result
                })
            },
            // 获取mv推荐
            getMvRecomList() {
                this.$http.get('/personalized/mv').then(res => {
                    this.mvRecomList = res.data.result
                    this.mvRecomList.pop();
                    console.log(this.mvRecomList);
                })
            }
        },
    }
</script>

<style scoped>
    #banner {
        margin-top: 40px;
    }
</style>