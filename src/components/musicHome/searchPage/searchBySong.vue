<template>
  <div class="searchBySong">
    <div id="songSearchHead">
      <span style="margin-left: 150px; color: #888888; font-size: 15px">音乐标题</span>
      <span style="position: absolute; left: 40%; color: #888888; font-size: 15px"
        >歌手</span
      >
      <span style="position: absolute; left: 80%; color: #888888; font-size: 15px"
        >时长</span
      >
    </div>
    <div
      :class="{ songMesSin: index % 2 !== 0, songMesDou: index % 2 === 0 }"
      v-for="(item, index) in songAll.songList"
      :key="index"
      background="#f9f9f9"
      @dblclick="startSong(item)"
    >
      <!-- <span>{{ index }}</span> -->
      <i
        class="iconfont icon-bofang"
        style="font-size: 10px; position: absolute; top: 2px; left: 28px; color: #ec4141"
        v-if="item.id === songId && isPlaying"
      ></i>
      <i
        class="iconfont icon-zanting"
        style="font-size: 10px; position: absolute; top: 2px; left: 28px; color: #ec4141"
        v-else-if="item.id === songId && !isPlaying"
      ></i>
      <span
        style="
          font-size: 15px !important;
          position: absolute;
          top: 2px;
          left: 25px;
          color: #373737;
        "
        v-else
        >{{ index >= 9 ? index + 1 : "0" + (index + 1) }}</span
      >
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
      <div
        :class="{ startSongAurtor: item.id === songId }"
        style="position: absolute; left: 40%"
      >
        <span style="cursor: pointer" v-for="(item, index) in item.ar" :key="index">{{
          index === 0 ? item.name : "/" + item.name
        }}</span>
      </div>
      <span style="position: absolute; left: 80%">{{
        Math.floor(item.dt / 1000) | timeFormat
      }}</span>
    </div>
    <div class="page">
      <pagination :songAll="songAll" />
    </div>
    <br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br />
  </div>
</template>

<script>
import { mapGetters, mapMutations, mapActions } from "vuex";
import pagination from "./pagination";
export default {
  name: "searchBySong",
  props: {
    // 歌曲搜索信息
    songAll: Object,
  },
  computed: {
    ...mapGetters([
      //当前播放列表
      "playList",
      //当前播放歌曲id
      "songId",
      //是否在播放
      "isPlaying",
    ]),
  },
  components: {
    //分页
    pagination,
  },
  data() {
    return {};
  },
  methods: {
    // 双击切换到当前播放
    startSong(musicDetail) {
      if (musicDetail.id === this.songId) return;

      // 获得音乐url并保存到当前播放url
      this.getMusicUrl(musicDetail.id);
      // 保存到当前播放歌曲详情
      this.$store.dispatch("saveMusicDetail", musicDetail);
      // 保存到当前播放歌曲id
      this.$store.dispatch("saveSongId", musicDetail.id);
      // 放入历史歌单
      this.$store.dispatch("deleteHisListSong", musicDetail.id);
      this.$store.dispatch("unshiftHisMusicList", musicDetail);
      // 放入已经播放过的歌单
      this.$store.dispatch("deleteHasListSong", musicDetail.id);
      this.$store.dispatch("pushHasPlayList", musicDetail);
      // 放入当前播放歌单
      for (let song of this.playList) {
        if (song.id === musicDetail.id) {
          const h = this.$createElement;
          this.$message.error({
            message: h("p", null, [
              h("span", null, "列表中已存在该歌曲"),
              h(
                "i",
                {
                  style: "color: red",
                },
                ""
              ),
            ]),
            offset: 280,
            center: true,
            showClose: true,
          });
          return;
        }
      }
      this.$store.dispatch("unshiftPlayList", musicDetail);
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
          this.$store.dispatch("saveMusicUrl", res.data.data[0].url);
        });
    },
  },
  created() {},
};
</script>

<style scoped>
/* 标题 */
#songSearchHead {
  position: relative;
  width: 100%;
  height: 50px;
  line-height: 50px;
  color: #363636;
  opacity: 0.8;
}
.page {
  margin-left: 50%;
  transform: translateX(-50%);
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
  margin-left: 150px;
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
  margin-left: 150px;
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
