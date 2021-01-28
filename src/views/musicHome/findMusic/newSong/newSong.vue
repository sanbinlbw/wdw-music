<template>
  <div class="newSong">
    <!-- 头部导航 -->
    <div style="margin-left: 55%; transform: translateX(-50%)">
      <headMenu />
    </div>
    <!-- 歌曲标签 -->
    <div style="width: 30%; margin-bottom: 20px">
      <songTag @getNewSong="getNewSong" />
    </div>
    <!-- 遍历的歌曲 -->
    <div v-loading="isLoading" element-loading-text="加载中...">
      <newSongInfo :newSongList="newSongList" />
    </div>
    <br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br />
  </div>
</template>

<script>
import headMenu from "@/components/musicHome/findMusic/newSong/headMenu";
import songTag from "@/components/musicHome/findMusic/newSong/songTag";
import newSongInfo from "@/components/musicHome/findMusic/newSong/newSongInfo";
import { mapGetters, mapMutations, mapActions } from "vuex";
export default {
  name: "newSong",
  components: {
    // 顶部菜单选项
    headMenu,
    // 歌曲标签
    songTag,
    // 歌曲数据
    newSongInfo,
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
          console.log(res.data);
          this.newSongList = res.data.data;
          for (let song of this.newSongList) {
            song["al"] = song["album"];
            delete song["album"];
            song["alia"] = song["alias"];
            delete song["alias"];
            song["ar"] = song["artists"];
            delete song["artists"];
            song["dt"] = song["duration"];
            delete song["duration"];
          }
          console.log(this.newSongList);
          this.$store.dispatch("changeIsLoading", false);
        });
    },
  },
  created() {
    this.getNewSong(0);
  },
};
</script>

<style scoped></style>
