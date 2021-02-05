<template>
  <div class="simiInfo">
    <!-- 最新音乐 -->
    <div
      v-for="(item, index) in simiInfo"
      :key="index"
      style="margin-bottom: 30px"
      @click="startSong(item)"
    >
      <div id="newSongDetail">
        <!-- 音乐封面 -->
        <el-image
          :src="item.al.picUrl"
          fit="fill"
          style="width: 25%; height: 25%; cursor: pointer"
        ></el-image>
        <!-- 音乐名字 -->
        <div id="newSongIntro">
          <span style="color: #000000; cursor: pointer">{{ item.name }}</span>
        </div>
        <div id="author">
          <img src="@/assets/image/SQ.jpg" alt="" style="margin-bottom: -2px" />
          <!-- 作者名 -->
          <span style="margin-left: 5px; cursor: pointer">{{ item.ar[0].name }}</span>
        </div>
        <!-- 播放键 -->
        <div style="position: absolute; top: 30%; left: 7%">
          <img src="@/assets/image/play_1.svg" alt="" id="playImg" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapMutations, mapActions } from "vuex";
export default {
  name: "simiInfo",
  components: {},
  props: {
    // 相似歌曲
    simiInfo: Array,
  },
  data() {
    return {};
  },
  computed: {
    ...mapGetters([
      //当前播放列表
      "playList",
      //当前播放歌曲id
      "songId",
      //是否在播放
      "isPlaying",
      //加载状态
      "isLoading",
      //可播放区域
      "slider",
    ]),
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
  },
};
</script>

<style scoped>
#newSongDetail {
  position: relative;
  width: 100%;
}

#newSongIntro {
  position: absolute;
  opacity: 0.9;
  top: 12%;
  left: 28%;
}

#newSongIntro:hover,
#author:hover {
  opacity: 1;
}

#newSongDetail:hover {
  cursor: pointer;
  background-color: #eaeaea;
}

#author {
  position: absolute;
  opacity: 0.9;
  bottom: 16%;
  left: 28%;
}

#playImg {
  width: 30px;
  height: 30px;
  border-radius: 100%;
  background: #f2f3f4;
}

#playImg:hover {
  cursor: pointer;
  opacity: 0.8;
}
</style>
