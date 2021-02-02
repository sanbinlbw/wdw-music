<template>
  <!-- 歌单细节 -->
  <div class="listDetail">
    <!-- 歌单封面 -->
    <el-image
      :src="playList.coverImgUrl"
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
        歌单
      </div>
      {{ playList.name }}
    </div>
    <!-- 作者信息 -->
    <div class="creator">
      <!-- 作者头像 -->
      <el-image
        :src="playList.creator.avatarUrl"
        fit="fill"
        style="border-radius: 40px; height: 40px; width: 40px; vertical-align: middle"
      ></el-image>
      <!-- 作者名 -->
      <span style="color: #507daf; cursor: pointer">
        {{ playList.creator.nickname }}
      </span>
      <!-- 创建时间 -->
      <span style="font-size: 10px; margin-left: 5px">
        {{ playList.createTime | dateFormat }} 创建
      </span>
    </div>
    <!-- 收听全部 -->
    <div class="playAllSong">
      <div class="playAll" @click="allAddList">
        <i class="iconfont icon-bofang" style="font-size: 15px"></i> 播放全部
      </div>
      <div class="orbtn">
        <i class="iconfont Add a document icon-Adddocument" style="font-size: 15px"></i>
        收藏({{
          playList.subscribedCount >= 100000
            ? (playList.subscribedCount / 10000).toFixed(0) + "万"
            : playList.subscribedCount
        }})
      </div>
      <div class="orbtn">
        <i class="iconfont icon-fenxiang" style="font-size: 15px"></i> 分享({{
          playList.shareCount >= 100000
            ? (playList.shareCount / 10000).toFixed(0) + "万"
            : playList.shareCount
        }})
      </div>
    </div>
    <!-- 介绍 -->
    <div class="listIntro">
      <div>
        标签：<span v-for="(item, index) in playList.tags" :key="index"
          ><span style="color: #507daf; cursor: pointer" @click="toSongListPage(item)">{{
            item
          }}</span
          >{{ index + 1 === playList.tags.length ? "" : " / " }}</span
        >
      </div>
      <div>
        <div style="display: inline-block; margin-right: 20px">
          歌曲：{{ playList.trackCount }}
        </div>
        <div style="display: inline-block">
          播放：{{
            playList.playCount >= 100000
              ? (playList.playCount / 10000).toFixed(0) + "万"
              : playList.playCount
          }}
        </div>
      </div>
      <div style="position: relative; width: 40vw">
        <div
          v-show="!isIntro"
          style="
            position: absolute;
            width: 95%;
            white-space: nowrap;
            text-overflow: ellipsis;
            overflow: hidden;
            word-break: break-all;
          "
        >
          简介：{{ playList.description }}
        </div>
        <div
          v-show="isIntro"
          style="position: absolute; z-index: 100; width: 95%; background: #fff"
        >
          简介：{{ playList.description }}
        </div>
        <i
          v-show="!isIntro"
          @click="isIntro = true"
          class="el-icon-caret-bottom"
          style="position: absolute; right: 0; cursor: pointer"
        ></i>
        <i
          v-show="isIntro"
          @click="isIntro = false"
          class="el-icon-caret-top"
          style="position: absolute; right: 0; cursor: pointer"
        ></i>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "listDetail",
  components: {},
  props: {
    // 歌单详情
    playList: Object,
    // 是否展开介绍
    isIntro: Boolean,
    // 歌曲详情
    songsDetail: Object,
  },
  data() {
    return {};
  },
  methods: {
    // 全部播放
    allAddList() {
      let songList = [];
      for (let song of this.songsDetail.privileges) {
        if (song.st != -200) {
          let index = this.songsDetail.privileges.indexOf(song);
          songList.push(this.songsDetail.songs[index]);
        }
      }
      console.log(songList);
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
  top: 43%;
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
  grid-template-rows: repeat(3, 1fr);
  row-gap: 10px;
}
</style>
