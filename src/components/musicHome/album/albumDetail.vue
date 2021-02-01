<template>
  <!-- 歌单细节 -->
  <div class="listDetail">
    <!-- 歌单封面 -->
    <el-image
      :src="albumDetail.picUrl"
      fit="fill"
      style="border-radius: 10px; height: 100%; width: 30vh; position: absolute"
    ></el-image>
    <!-- 歌单名 -->
    <div class="listName">
      <div
        style="
          color: #d03535;
          border: 1px solid #d03535;
          display: inline-block;
          font-size: 20px;
          margin-right: 10px;
          border-radius: 5px;
          padding: 0 7px;
          cursor: default;
        "
      >
        专辑
      </div>
      {{ albumDetail.name }}
    </div>
    <!-- 介绍 -->
    <div class="listIntro">
      <div style="">歌手：{{ albumDetail.artist.name }}</div>
      <div style="display: inline-block">
        时间：{{ albumDetail.publishTime | dateFormat }}
      </div>
    </div>
    <!-- 收听全部 -->
    <div class="playAllSong">
      <div class="playAll" @click="allAddList">
        <i class="iconfont icon-bofang" style="font-size: 15px"></i> 播放全部
      </div>
      <div class="orbtn">
        <i class="iconfont icon-fenxiang" style="font-size: 15px"></i> 分享({{
          albumDetail.info.shareCount >= 10000
            ? (albumDetail.info.shareCount / 10000).toFixed(0) + "万"
            : albumDetail.info.shareCount
        }})
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "listDetail",
  components: {},
  props: {
    // 专辑详情
    albumDetail: Object,
    // 歌曲
    songs: Array,
  },
  data() {
    return {};
  },
  methods: {
    // 全部播放
    allAddList() {
      let songList = [];
      for (let song of this.songs) {
        if (song.st != -200) {
          songList.push(song);
        }
      }
      // 全部加入歌单
      this.$store.dispatch("playAllSong", songList);
      // 获得音乐url并保存到当前播放url
      this.getMusicUrl(songList[0].id);
      this.$store.dispatch("deleteHisListSong", songList[0].id);
      this.$store.dispatch("unshiftHisMusicList", songList[0]);
    },
    //根据id获取音乐url
    async getMusicUrl(musicId) {
      await this.$http
        .get("song/url", {
          params: {
            id: musicId,
          },
        })
        .then((res) => {
          if (res.data.data[0].freeTrialInfo) {
            this.$store.dispatch("saveAur", [
              res.data.data[0].freeTrialInfo.start,
              res.data.data[0].freeTrialInfo.end,
            ]);
          } else {
            this.$store.dispatch("saveAur", [0, 0]);
          }
          this.$store.dispatch("saveMusicUrl", res.data.data[0].url);
        });
    },
    //点击歌单跳转界面
    toSongListPage(tag) {
      this.$router.push({ name: "songList", query: { tag: tag } });
    },
  },
};
</script>

<style scoped>
/* 歌单细节 */
.listDetail {
  position: relative;
  margin-left: 50px;
  margin-top: 20px;
  width: 97%;
  height: 30vh;
}
/* 歌单名 */
.listName {
  position: absolute;
  font-size: 25px;
  font-weight: 600;
  left: 35vh;
  top: 1%;
}
/* 作者名 */
.creator {
  position: absolute;
  height: 40px;
  left: 35vh;
  top: 20%;
}
.playAllSong {
  position: absolute;
  left: 35vh;
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
  left: 35vh;
  top: 65%;
  display: grid;
  grid-template-rows: repeat(2, 1fr);
  row-gap: 10px;
}
</style>
