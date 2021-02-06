<template>
  <div class="newSong">
    <!-- 头部导航 -->
    <div style="margin-left: 55%; transform: translateX(-50%)">
      <headMenu :isNewSongList="isNewSongList" @changeModel="changeModel" />
    </div>
    <!-- 歌曲标签 -->
    <div
      style="position: relative; width: 100%; margin-bottom: 20px"
      v-show="isNewSongList"
    >
      <songTag @getNewSong="getNewSong" style="width: 30%" />
      <!-- 播放全部 -->
      <div class="playAllSong">
        <div class="playAll" @click="allAddList">
          <i class="iconfont icon-bofang" style="font-size: 15px"></i> 播放全部
        </div>
      </div>
    </div>
    <!-- 遍历的歌曲 -->
    <div v-loading="isLoading" element-loading-text="加载中...">
      <!-- 新歌速递 -->
      <newSongInfo :newSongList="newSongList" v-if="isNewSongList" />
      <!-- 新碟上架 -->
      <newDiscInfo :newDiscList="newDiscList" style="margin-top: 20px" v-else />
    </div>
    <br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br />
  </div>
</template>

<script>
import headMenu from "@/components/musicHome/findMusic/newSong/headMenu";
import songTag from "@/components/musicHome/findMusic/newSong/songTag";
import newSongInfo from "@/components/musicHome/findMusic/newSong/newSongInfo";
import newDiscInfo from "@/components/musicHome/findMusic/newSong/newDiscInfo";
import { mapGetters, mapMutations, mapActions } from "vuex";
export default {
  name: "newSong",
  components: {
    // 顶部菜单选项
    headMenu,
    // 歌曲标签
    songTag,
    // 新歌速递数据
    newSongInfo,
    // 新碟速递数据
    newDiscInfo,
  },
  computed: {
    ...mapGetters([
      // 加载状态
      "isLoading",
    ]),
  },
  data() {
    return {
      //歌曲数据
      newSongList: [],
      //歌碟数据
      newDiscList: [],
      //当前播放是否显示
      isNewSongList: true,
    };
  },
  methods: {
    // 通过标签获得歌曲数据
    getNewSong(type) {
      this.$store.dispatch("changeIsLoading", true);
      this.$http
        .get("top/song", {
          params: {
            type: type,
          },
        })
        .then((res) => {
          this.newSongList = res.data.data;
          for (let song of this.newSongList) {
            // 某些键值和之前请求的不符合，进行修改
            song["al"] = song["album"];
            delete song["album"];
            song["alia"] = song["alias"];
            delete song["alias"];
            song["ar"] = song["artists"];
            delete song["artists"];
            song["dt"] = song["duration"];
            delete song["duration"];
          }
          // console.log(this.newSongList);
          this.$store.dispatch("changeIsLoading", false);
        });
    },
    // 修改展示栏
    changeModel(isShow) {
      this.isNewSongList = isShow;
      if (!this.isNewSongList) {
        this.$store.dispatch("changeIsLoading", true);
        this.$http.get("album/newest").then((res) => {
          // console.log(res.data);
          this.newDiscList = res.data.albums;
          this.$store.dispatch("changeIsLoading", false);
        });
      }
    },
    // 全部播放
    allAddList() {
      // 全部加入歌单
      this.$store.dispatch("playAllSong", this.newSongList);
      // 获得音乐url并保存到当前播放url
      this.getMusicUrl(this.newSongList[0].id);
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
  created() {
    this.getNewSong(0);
  },
};
</script>

<style scoped>
.playAllSong {
  position: absolute;
  right: 10%;
  top: 0;
}
.playAll {
  border-radius: 20px;
  background: #d03535;
  padding: 5px 15px;
  color: #fff;
  cursor: pointer;
}
.playAll:hover {
  background: #bb2929;
}
</style>
