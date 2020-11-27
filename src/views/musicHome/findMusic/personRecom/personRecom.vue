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
      <el-divider content-position="left"><p style="font-size: 20px;">推荐歌曲</p></el-divider>
      <div id="recomSong">

      </div>
  </div>
</template>

<script>
    export default {
        name: 'personRecom',
        components: {},
        data() {
            return {
                //轮播图列表
                bannerInfo: [],
            }
        },
        created() {
            this.getBannerInfo()
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