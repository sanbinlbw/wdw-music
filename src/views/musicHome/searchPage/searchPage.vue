<template>
  <div class="searchPage">
    <span
      style="font-size: 10px; color: #adadad; font-weight: 400"
      v-show="this.$route.path == '/musicHome/searchPage/searchBySong'"
      >找到{{ songAll.songCount }}首单曲</span
    >
    <span
      style="font-size: 10px; color: #adadad; font-weight: 400"
      v-show="this.$route.path == '/musicHome/searchPage/searchBySinger'"
      >找到{{ songAll.singerCount }}位歌手</span
    >
    <span
      style="font-size: 10px; color: #adadad; font-weight: 400"
      v-show="this.$route.path == '/musicHome/searchPage/searchByAlbum'"
      >找到{{ songAll.albumCount }}张专辑</span
    >
    <span
      style="font-size: 10px; color: #adadad; font-weight: 400"
      v-show="this.$route.path == '/musicHome/searchPage/searchByVideo'"
      >找到{{ songAll.videoCount }}个视频</span
    >
    <span
      style="font-size: 10px; color: #adadad; font-weight: 400"
      v-show="this.$route.path == '/musicHome/searchPage/searchBySongList'"
      >找到{{ songAll.songListCount }}个歌单</span
    >
    <div id="headTab">
      <!-- 头部导航栏 -->
      <searchHeadTab />
    </div>
    <div v-loading="isLoading" element-loading-text="加载中...">
      <!-- 子路由 -->
      <router-view
        id="secondRoute"
        :songAll="songAll"
        @getSongPage="getSongPage"
        ref="songPage"
      />
    </div>
  </div>
</template>

<script>
import { mapGetters, mapMutations, mapActions } from "vuex";
import searchHeadTab from "@/components/musicHome/searchPage/searchHeadTab";
export default {
  name: "searchPage",
  props: {
    //搜索栏内容
    searchData: String,
  },
  components: {
    searchHeadTab,
  },
  computed: {
    ...mapGetters([
      // 搜索信息
      "searchInfo",
      // 加载状态
      "isLoading",
    ]),
  },
  data() {
    return {
      //歌曲总数及歌曲
      songAll: {
        //歌曲总数
        songCount: 0,
        //歌曲列表
        songList: [],
        //歌手总数
        singerCount: 0,
        //歌手列表
        singerList: [],
        //专辑总数
        albumCount: 0,
        //专辑列表
        albumList: [],
        //视频总数
        videoCount: 0,
        //视频列表
        videoList: [],
        //歌单总数
        songListCount: 0,
        //歌单列表
        songList: [],
      },
    };
  },
  methods: {
    //请求数据
    getSongPage(offset, type) {
      this.$store.dispatch("changeIsLoading", true);
      // 数据清空
      this.songAll.songList = [];
      this.songAll.artistList = [];
      this.songAll.albumList = [];
      this.songAll.videoList = [];
      switch (type) {
        //请求单曲数据
        case "Song":
          this.$http
            .get("/cloudsearch", {
              params: {
                keywords: this.searchInfo.trim(),
                type: 1,
                limit: 50,
                offset: offset * 50,
              },
            })
            .then((res) => {
              console.log(res.data.result);
              this.songAll.songCount = res.data.result.songCount;
              this.songAll.songList = res.data.result.songs;
              this.$store.dispatch("changeIsLoading", false);
            });
          break;
        //请求歌手数据
        case "Singer":
          this.$http
            .get("/cloudsearch", {
              params: {
                keywords: this.searchInfo.trim(),
                type: 100,
                limit: 20,
                offset: offset * 20,
              },
            })
            .then((res) => {
              console.log(res.data.result);
              this.songAll.singerCount = res.data.result.artistCount;
              this.songAll.singerList = res.data.result.artists;
              this.$store.dispatch("changeIsLoading", false);
            });
          break;
        //请求专辑数据
        case "Album":
          this.$http
            .get("/cloudsearch", {
              params: {
                keywords: this.searchInfo.trim(),
                type: 10,
                limit: 20,
                offset: offset * 20,
              },
            })
            .then((res) => {
              console.log(res.data.result);
              this.songAll.albumCount = res.data.result.albumCount;
              this.songAll.albumList = res.data.result.albums;
              this.$store.dispatch("changeIsLoading", false);
            });
          break;
        //请求视频数据
        case "Video":
          this.$http
            .get("/cloudsearch", {
              params: {
                keywords: this.searchInfo.trim(),
                type: 1014,
                limit: 24,
                offset: offset * 24,
              },
            })
            .then((res) => {
              console.log(res.data.result);
              this.songAll.videoCount = res.data.result.videoCount;
              this.songAll.videoList = res.data.result.videos;
              this.$store.dispatch("changeIsLoading", false);
            });
          break;
        // 请求歌单数据
        case "SongList":
          this.$http
            .get("/cloudsearch", {
              params: {
                keywords: this.searchInfo.trim(),
                type: 1000,
                limit: 20,
                offset: offset * 20,
              },
            })
            .then((res) => {
              console.log(res.data.result);
              this.songAll.songListCount = res.data.result.playlistCount;
              this.songAll.songList = res.data.result.playlists;
              this.$store.dispatch("changeIsLoading", false);
            });
          break;
      }
    },
    backNumOne() {
      this.$refs.songPage.backNumOne();
    },
  },
  created() {
    if (this.searchInfo.trim() !== "") this.getSongPage(0, this.$route.path.slice(30));
  },
};
</script>

<style scoped>
#headTab {
  /* width: 100%; */
  width: 450px;
  height: 70px;
  margin-left: 50%;
  transform: translateX(-50%);
}
/* 子路由样式 */

#secondRoute:hover {
  overflow-y: overlay;
}

#secondRoute {
  padding-right: 17px;
  padding-left: 3px;
  height: 90vh;
  width: 100%;
  overflow-y: hidden;
  overflow-x: hidden;
}
</style>
