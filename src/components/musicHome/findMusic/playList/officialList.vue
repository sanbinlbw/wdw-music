<template>
  <div class="officialList">
    <div
      v-for="(item, index) in officialListInfo"
      :key="index"
      style="margin-bottom: 80px"
    >
      <div style="width: 180px; display: inline-block; margin-right: 50px">
        <div
          id="playDetail"
          @mouseover="addPlay(index)"
          @mouseleave="reducePlay"
          @click="toSongListPage(item.id)"
        >
          <!-- 歌单封面 -->
          <el-image
            :src="item.coverImgUrl"
            fit="fill"
            style="border-radius: 10px; width: 180px"
          ></el-image>
          <!-- 鼠标停靠出现播放键 -->
          <div
            :class="{
              playAppear: currentIndex === index,
              playNone: currentIndex !== index,
            }"
          >
            <img src="@/assets/image/play_1.svg" alt="" id="playImg" />
          </div>
        </div>
      </div>
      <!-- 展示歌曲 -->
      <div style="width: 70%; display: inline-block; position: relative">
        <div
          :class="{ songMesSin: index % 2 !== 0, songMesDou: index % 2 === 0 }"
          v-for="(song, index) in item.tracks"
          :key="index"
          background="#f9f9f9"
          @mouseenter="songIndex = index"
          @mouseleave="songIndex = -1"
        >
          <!-- 歌曲序号 -->
          <span
            style="
              font-size: 15px !important;
              position: absolute;
              top: 2px;
              left: 25px;
              color: #d73535;
            "
            >{{ index + 1 }}</span
          >
          <!-- 歌曲名 -->
          <div class="pauseSongName" style="cursor: default">
            <span>{{ song.first }}</span>
          </div>
          <!-- 作者名 -->
          <div style="position: absolute; left: 75%">
            <div
              style="
                width: 160px;
                white-space: nowrap;
                text-overflow: ellipsis;
                overflow: hidden;
                word-break: break-all;
              "
            >
              <span style="cursor: pointer">{{ song.second }}</span>
            </div>
          </div>
        </div>
        <span class="showAll" @click="toSongListPage(item.id)">查看全部 ></span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "officialList",
  components: {},
  props: {
    // 官方排行榜数据
    officialListInfo: Array,
    // 歌手排行榜
    artistToplistInfo: Object,
  },
  data() {
    return {
      // 鼠标悬停的判断
      currentIndex: -1,
      // 歌曲悬停判断
      songIndex: -1,
    };
  },
  methods: {
    // 鼠标移入
    addPlay(index) {
      this.currentIndex = index;
    },
    // 鼠标移出
    reducePlay() {
      this.currentIndex = -1;
    },
    //点击歌单跳转界面
    toSongListPage(id) {
      this.$router.push("/musicHome/songList/" + id);
    },
  },
};
</script>

<style scoped>
/* 布局 */

#playDetail {
  display: block;
  width: 100%;
  position: relative;
  cursor: pointer;
}
/* 播放键出现 */

.playAppear {
  width: 80px;
  height: 80px;
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  margin: auto;
  animation-name: play;
  animation-duration: 0.8s;
  animation-iteration-count: 1;
  animation-fill-mode: forwards;
}
/* 播放动画 */

@keyframes play {
  0% {
    opacity: 0;
  }
  100% {
    opacity: 1;
  }
}

.playNone {
  display: none;
}
#playImg {
  display: inline-block;
  width: 80px;
  height: 80px;
  border-radius: 100%;
  background: #f2f3f4;
}
/* 每行歌曲样式 */

.songMesSin {
  position: relative;
  width: 100%;
  height: 60px;
  line-height: 60px;
  color: #363636;
  opacity: 0.8;
}

.songMesDou {
  position: relative;
  width: 100%;
  height: 60px;
  line-height: 60px;
  color: #363636;
  opacity: 0.8;
  background: #f9f9f9;
}

.songMesSin:hover,
.songMesDou:hover {
  background: #f4f4f4;
}
.pauseSongName {
  position: absolute;
  width: 20%;
  left: 33%;
  opacity: 0.9;
  /* 超出省略号 */
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;
  word-break: break-all;
  color: #000000;
}
.showAll {
  opacity: 0.8;
  cursor: pointer;
  position: absolute;
  bottom: -18%;
  left: 2%;
}
.showAll:hover {
  opacity: 1;
}
</style>
