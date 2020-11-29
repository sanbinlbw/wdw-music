<template>
  <div class="personRecom">
      <!-- 轮播图 -->
      <div id="banner">
        <el-carousel :interval="4000" type="card" height="280px">
            <el-carousel-item v-for="(item,index) in bannerInfo" :key="index">
                <el-image @click="changeUrl(item.targetId)" :src="item.imageUrl" fit="contain"
                style="height: 250px;"></el-image> 
                <el-tag :type="item.typeTitle === '独家' ? 'danger' : 'primary'" effect="dark"
                            style="position: absolute; bottom: 14%;right: 0;border-radius: 5px">
                        {{item.typeTitle}}
                    </el-tag>
            </el-carousel-item>
          </el-carousel>
      </div>
      <el-divider content-position="left"><p style="font-size: 20px;">推荐歌单</p></el-divider>
      <div id="recomSong">
        <recomSong :recomSongList="recomSongList"></recomSong>
      </div>
  </div>
</template>

<script>
    import recomSong from './recomSong'
    export default {
        name: 'personRecom',
        components: {
            recomSong
        },
        data() {
            return {
                //轮播图列表
                bannerInfo: [],
                //推荐歌单列表
                recomSongList: [],
            }
        },
        created() {
            this.getBannerInfo()
            this.getRecomSongList()
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
                    console.log(this.recomSongList);
                })
            }
        },
    }
</script>

<style scoped>
    /* 轮播图样式 */
    
    #banner {
        margin-top: 40px;
    }
    
    .el-carousel__item:nth-child(2n) {
        background-color: #ffffff;
    }
    
    .el-carousel__item:nth-child(2n+1) {
        background-color: #ffffff;
    }
</style>