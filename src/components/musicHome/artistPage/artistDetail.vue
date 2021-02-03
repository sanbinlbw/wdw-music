<template>
  <!-- 歌单细节 -->
  <div class="listDetail">
    <!-- 歌单封面 -->
    <el-image
      :src="artistDetail.artist.cover"
      fit="fill"
      style="border-radius: 10px; height: 100%; width: 37vh; position: absolute"
    ></el-image>
    <!-- 歌单名 -->
    <div class="listName">
      {{ artistDetail.artist.name }}
    </div>
    <!-- 介绍 -->
    <div class="listIntro">
      <div style="display: inline-block">单曲数：{{ artistDetail.artist.musicSize }}</div>
      <div style="display: inline-block">专辑数：{{ artistDetail.artist.albumSize }}</div>
    </div>
    <!-- 收听全部 -->
    <div class="playAllSong">
      <div class="orbtn">
        <i class="iconfont icon-Adddocument" style="font-size: 15px"></i> 收藏
      </div>
      <div class="orbtn">
        <i class="el-icon-s-custom" style="font-size: 15px"></i> 个人主页
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "listDetail",
  components: {},
  props: {
    // 歌手详情
    artistDetail: Object,
  },
  data() {
    return {};
  },
  methods: {},
};
</script>

<style scoped>
/* 歌单细节 */
.listDetail {
  position: relative;
  margin-left: 20px;
  margin-top: 20px;
  width: 97%;
  height: 35vh;
}
/* 歌单名 */
.listName {
  position: absolute;
  font-size: 25px;
  font-weight: 600;
  left: 40vh;
  top: 1%;
}
/* 作者名 */
.creator {
  position: absolute;
  height: 40px;
  left: 40vh;
  top: 20%;
}
.playAllSong {
  position: absolute;
  left: 40vh;
  top: 35%;
}
/* 播放键 */
.playAll {
  display: inline-block;
  margin-right: 10px;
  border-radius: 20px;
  background: #d03535;
  padding: 5px 15px;
  color: #fff;
  cursor: pointer;
}
.playAll:hover {
  background: #bb2929;
}
.orbtn {
  display: inline-block;
  margin-right: 10px;
  border-radius: 20px;
  border: 1px solid #d8d8d8;
  padding: 5px 15px;
  cursor: pointer;
}
.orbtn:hover {
  background: #f2f2f2;
}
/* 介绍 */
.listIntro {
  position: absolute;
  height: 30%;
  left: 40vh;
  top: 65%;
  display: grid;
  grid-template-rows: repeat(2, 1fr);
  row-gap: 10px;
}
</style>
