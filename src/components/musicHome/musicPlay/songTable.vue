<template>
  <div class="songTable">
    <div
      :class="{ selTableTitle: isPlayList, noTableTitle: !isPlayList }"
      @click="changeNowPlay"
    >
      播放列表
    </div>
    <div
      :class="{ selTableTitled: isHisPlayList, noTableTitled: !isHisPlayList }"
      @click="changeHisPlay"
    >
      历史记录
    </div>
    <div style="width: 100%; height: 5%; position: relative">
      <span style="font-size: 6px; opacity: 0.5; margin-left: 9%"
        >总{{ playList.length }}首</span
      >
      <div id="tableOpe" @click="cleanPlayList">
        <i class="iconfont icon-act_qingkong"></i>
        清空
      </div>
    </div>
    <div v-show="isPlayList">
      <div
        v-show="!playList[0]"
        style="margin-top: 50%; margin-left: 50%; transform: translate(-30%, -50%)"
      >
        你还没有添加任何歌曲！
      </div>
      <div
        :class="{ songMesSin: index % 2 === 0, songMesDou: index % 2 !== 0 }"
        v-for="(item, index) in playList"
        :key="index"
        background="#f9f9f9"
        @dblclick="startSong(item.id)"
      >
        <i
          class="iconfont icon-bofang"
          style="font-size: 10px; position: absolute; top: 2px; left: 8px; color: #ec4141"
          v-show="item.id === songId && isPlaying"
        ></i>
        <i
          class="iconfont icon-zanting"
          style="font-size: 10px; position: absolute; top: 2px; left: 8px; color: #ec4141"
          v-show="item.id === songId && !isPlaying"
        ></i>
        <div
          :class="{
            pauseSongName: item.id !== songId,
            startSongName: item.id === songId,
          }"
        >
          <span>{{ item.name }}</span>
          <span style="color: #949495">{{
            !item.alia[0] ? "" : "(" + item.alia[0] + ")"
          }}</span>
        </div>
        <span
          :class="{ startSongAurtor: item.id === songId }"
          style="cursor: pointer; position: absolute; left: 40%"
          >{{ item.ar[0].name }}</span
        >
        <span style="position: absolute; left: 80%">{{
          Math.floor(item.dt / 1000) | timeFormat
        }}</span>
      </div>
    </div>
    <div v-show="isHisPlayList">
      <div
        v-show="!hisMusicList[0]"
        style="margin-top: 50%; margin-left: 50%; transform: translate(-30%, -50%)"
      >
        你还没有播放任何歌曲！
      </div>
      <div
        :class="{ songMesSin: index % 2 === 0, songMesDou: index % 2 !== 0 }"
        v-for="(item, index) in hisMusicList"
        :key="index"
        background="#f9f9f9"
        @dblclick="startSong(item.id)"
      >
        <i
          class="iconfont icon-bofang"
          style="font-size: 10px; position: absolute; top: 2px; left: 8px; color: #ec4141"
          v-show="item.id === songId && isPlaying"
        ></i>
        <i
          class="iconfont icon-zanting"
          style="font-size: 10px; position: absolute; top: 2px; left: 8px; color: #ec4141"
          v-show="item.id === songId && !isPlaying"
        ></i>
        <div
          :class="{
            pauseSongName: item.id !== songId,
            startSongName: item.id === songId,
          }"
        >
          <span>{{ item.name }}</span>
          <span style="color: #949495">{{
            !item.alia[0] ? "" : "(" + item.alia[0] + ")"
          }}</span>
        </div>
        <span
          :class="{ startSongAurtor: item.id === songId }"
          style="cursor: pointer; position: absolute; left: 40%"
          >{{ item.ar[0].name }}</span
        >
        <span style="position: absolute; left: 80%">{{
          Math.floor(item.dt / 1000) | timeFormat
        }}</span>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapMutations, mapActions } from "vuex";
export default {
  name: "songTable",
  props: {},
  components: {},
  data() {
    return {
      //当前播放是否显示
      isPlayList: true,
      //历史播放是否显示
      isHisPlayList: false,
    };
  },
  computed: {
    ...mapGetters([
      //当前播放列表
      "playList",
      //当前歌曲id
      "songId",
      //历史播放列表
      "hisMusicList",
      //判断当前是否在播放
      "isPlaying",
    ]),
  },
  methods: {
    // 双击切换到当前播放
    startSong(musicId) {
      if (musicId === this.songId) return;
      this.$emit("playListSong", musicId);
    },
    // 清空当前歌单
    cleanPlayList() {
      this.$emit("cleanList");
    },
    //切换到当前播放
    changeNowPlay() {
      this.isPlayList = true;
      this.isHisPlayList = false;
    },
    //切换到历史播放
    changeHisPlay() {
      this.isPlayList = false;
      this.isHisPlayList = true;
    },
  },
  created() {},
};
</script>

<style scoped>
/* 表格样式 */

.songTable {
  position: fixed;
  right: 0;
  bottom: 81px;
  height: 80vh;
  width: 30%;
  z-index: 100;
  background: #ffffff;
  overflow-y: overlay;
  border-left: 1px solid #ebebed;
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
}

.noTableTitle {
  width: 120px;
  height: 30px;
  line-height: 30px;
  border: 1px solid #bbbbbb;
  border-radius: 35px;
  color: #000000;
  margin-top: 15px;
  margin-bottom: 15px;
  margin-left: 27%;
  text-align: center;
  font-size: 13px;
}

.selTableTitle {
  width: 120px;
  height: 30px;
  line-height: 30px;
  border: 1px solid #bbbbbb;
  border-radius: 35px;
  background: #bbbbbb;
  color: #ffffff;
  margin-top: 15px;
  margin-bottom: 15px;
  margin-left: 27%;
  text-align: center;
  font-size: 13px;
}

.noTableTitled {
  position: absolute;
  top: 15px;
  left: 47%;
  width: 120px;
  height: 30px;
  line-height: 30px;
  border: 1px solid #bbbbbb;
  border-radius: 35px;
  color: #000000;
  text-align: center;
  font-size: 13px;
}

.selTableTitled {
  position: absolute;
  top: 15px;
  left: 47%;
  width: 120px;
  height: 30px;
  line-height: 30px;
  border: 1px solid #bbbbbb;
  border-radius: 35px;
  background: #bbbbbb;
  color: #ffffff;
  text-align: center;
  font-size: 13px;
}
/* 操作样式 */

#tableOpe {
  position: absolute;
  right: 10%;
  top: 0;
  font-size: 15px;
  cursor: pointer;
  opacity: 0.7;
  margin-bottom: 5px;
}

#tableOpe:hover {
  opacity: 1;
}
/* 每行歌曲样式 */

.songMesSin {
  position: relative;
  width: 100%;
  height: 50px;
  line-height: 50px;
  color: #363636;
  opacity: 0.8;
}

.songMesDou {
  position: relative;
  width: 100%;
  height: 50px;
  line-height: 50px;
  color: #363636;
  opacity: 0.8;
  background: #f9f9f9;
}

.songMesSin:hover,
.songMesDou:hover {
  background: #f4f4f4;
}
/* 判断是否正在播放 */

.pauseSongName {
  position: absolute;
  width: 160px;
  margin-left: 30px;
  opacity: 0.9;
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;
  word-break: break-all;
  color: #000000;
}

.startSongName {
  position: absolute;
  width: 160px;
  margin-left: 30px;
  opacity: 0.9;
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;
  word-break: break-all;
  color: #ec4141 !important;
}

.startSongAurtor {
  color: #ec4141 !important;
}
</style>
