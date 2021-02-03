<template>
  <div class="newSongInfo">
    <div
      :class="{ songMesSin: index % 2 !== 0, songMesDou: index % 2 === 0 }"
      v-for="(item, index) in newSongList"
      :key="index"
      background="#f9f9f9"
      @dblclick="startSong(item)"
      @mouseenter="currentIndex = index"
      @mouseleave="currentIndex = -1"
    >
      <!-- 播放或暂停音乐动画表情 -->
      <div
        style="
          font-size: 10px;
          position: absolute;
          top: 50%;
          left: 28px;
          color: #ec4141;
          transform: translateY(-50%);
        "
        v-if="item.id === songId && isPlaying"
      >
        <playAni />
      </div>
      <i
        class="iconfont icon-zanting"
        style="font-size: 10px; position: absolute; top: 2px; left: 28px; color: #ec4141"
        v-else-if="item.id === songId && !isPlaying"
      ></i>
      <!-- 歌曲序号 -->
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
      <!-- 音乐封面 -->
      <el-image
        :src="item.al.picUrl"
        fit="fill"
        style="
          position: absolute;
          left: 70px;
          margin-top: 5px;
          width: 110px;
          height: 110px;
          cursor: pointer;
        "
      ></el-image>
      <!-- 播放键 -->
      <div style="position: absolute; top: 13%; left: 125px; transform: translateX(-50%)">
        <img
          src="@/assets/image/play_1.svg"
          alt=""
          id="playImg"
          style="cursor: pointer"
          @click="startSong(item)"
        />
      </div>
      <!-- 歌曲名 -->
      <div
        :class="{
          pauseSongName: item.id !== songId,
          startSongName: item.id === songId,
        }"
        style="cursor: default"
      >
        <span :title="item.name + (!item.alia[0] ? '' : '(' + item.alia[0] + ')')">{{
          item.name
        }}</span>
        <span
          style="color: #949495"
          :title="item.name + (!item.alia[0] ? '' : '(' + item.alia[0] + ')')"
          >{{ !item.alia[0] ? "" : "(" + item.alia[0] + ")" }}</span
        >
      </div>
      <!-- 作者名 -->
      <div style="position: absolute; left: 50%">
        <div
          style="
            width: 160px;
            white-space: nowrap;
            text-overflow: ellipsis;
            overflow: hidden;
            word-break: break-all;
          "
        >
          <span
            style="cursor: pointer"
            v-for="(item, index) in item.ar"
            :key="index"
            @click="toArtistPage(item.id)"
            >{{ index === 0 ? item.name : "/" + item.name }}</span
          >
        </div>
      </div>
      <!-- 专辑 -->
      <div
        style="
          width: 15%;
          white-space: nowrap;
          text-overflow: ellipsis;
          overflow: hidden;
          word-break: break-all;
          position: absolute;
          left: 70%;
          cursor: pointer;
          font-weight: 300;
        "
        @click="toAlbumPage(item.al.id)"
      >
        {{ item.al.name }}
      </div>
      <!-- 时长 -->
      <span style="position: absolute; left: 90%">{{
        Math.floor(item.dt / 1000) | timeFormat
      }}</span>
    </div>
  </div>
</template>

<script>
import playAni from "@/components/musicHome/playAnimation/playAni";
import { mapGetters, mapMutations, mapActions } from "vuex";
export default {
  name: "newSongInfo",
  components: {
    // 播放动画
    playAni,
  },
  props: {
    // 歌曲数据
    newSongList: Array,
  },
  computed: {
    ...mapGetters([
      //当前播放歌曲id
      "songId",
      //是否在播放
      "isPlaying",
      //加载状态
      "isLoading",
      //可播放区域
      "slider",
      //当前播放列表
      "playList",
    ]),
  },
  data() {
    return {
      currentIndex: -1,
    };
  },
  methods: {
    // 双击切换到当前播放
    startSong(musicDetail) {
      if (musicDetail.id === this.songId) return;
      if (musicDetail.privilege.st == -200) {
        const h = this.$createElement;
        this.$message.error({
          message: h("p", null, [
            h("span", null, "因版权问题，该歌曲已下架"),
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
      // 获得音乐url并保存到当前播放url
      this.getMusicUrl(musicDetail.id);
      // 保存到当前播放歌曲详情
      this.$store.dispatch("saveMusicDetail", musicDetail);
      // 保存到当前播放歌曲id
      this.$store.dispatch("saveSongId", musicDetail.id);
      // 放入历史歌单
      this.$store.dispatch("deleteHisListSong", musicDetail.id);
      this.$store.dispatch("unshiftHisMusicList", musicDetail);
      this.addList(musicDetail);
    },
    //加入歌单
    addList(musicDetail) {
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
      this.$store.dispatch("pushPlayList", musicDetail);
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
    //点击专辑跳转界面
    toAlbumPage(id) {
      this.$router.push("/musicHome/albumPage/" + id);
    },
    //点击歌手跳转界面
    toArtistPage(id) {
      this.$router.push("/musicHome/artistPage/" + id);
    },
  },
};
</script>

<style scoped>
/* 每行歌曲样式 */

.songMesSin {
  position: relative;
  width: 100%;
  height: 120px;
  line-height: 120px;
  color: #363636;
}

.songMesDou {
  position: relative;
  width: 100%;
  height: 120px;
  line-height: 120px;
  color: #363636;
  background: #f9f9f9;
}

.songMesSin:hover,
.songMesDou:hover {
  background: #f4f4f4;
}
/* 判断是否正在播放 */

.pauseSongName {
  position: absolute;
  width: 20%;
  left: 17%;
  font-size: 18px;
  /* 超出省略号 */
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;
  word-break: break-all;
  color: #000000;
}

.startSongName {
  position: absolute;
  width: 20%;
  left: 17%;
  /* 超出省略号 */
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;
  word-break: break-all;
  color: #ec4141 !important;
}
#playImg {
  width: 40px;
  height: 40px;
  border-radius: 100%;
  background: #f2f3f4;
}
</style>
