<template>
  <div class="artistPage">
    <!-- 歌手详情 -->
    <artistDetail :artistDetail="artistDetail" />
    <!-- 导航栏 -->
    <menuTab
      @changeActive="changeActive"
      style="margin-bottom: 20px"
      :mvCount="artistDetail.videoCount"
    />
    <div v-loading="isLoading" element-loading-text="加载中...">
      <!-- 专辑 -->
      <album
        v-show="activeIndex == '1'"
        :artistAlbum="artistAlbum"
        @getAlbumPage="getArtistAlbum"
      />
      <!-- mv -->
      <mv
        v-show="activeIndex == '2'"
        :artistMv="artistMv"
        :mvCount="artistDetail.videoCount"
        @getMvPage="getArtistMv"
      />
      <!-- 歌手描述 -->
      <artistDesc v-show="activeIndex == '3'" :artistDesc="artistDesc" />
      <!-- 相似歌手 -->
      <sameArtist v-show="activeIndex == '4'" :sameArtist="sameArtist" />
    </div>
    <br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br />
  </div>
</template>

<script>
import { mapGetters, mapMutations, mapActions } from "vuex";
import artistDetail from "@/components/musicHome/artistPage/artistDetail";
import menuTab from "@/components/musicHome/artistPage/menuTab";
import album from "@/components/musicHome/artistPage/album";
import mv from "@/components/musicHome/artistPage/mv";
import artistDesc from "@/components/musicHome/artistPage/artistDesc";
import sameArtist from "@/components/musicHome/artistPage/sameArtist";
export default {
  name: "artistPage",
  components: {
    artistDetail,
    menuTab,
    album,
    mv,
    artistDesc,
    sameArtist,
  },
  watch: {
    $route: function (newVal, oldVal) {
      this.artistId = newVal.params.id;
      if (newVal.params.id != oldVal.params.id) {
        this.getArtistDetail();
        this.getArtistAlbum(0);
        this.getArtistMv(0);
        this.getArtistDesc();
        this.getSameArtist();
      }
    },
  },
  data() {
    return {
      // 歌手id
      artistId: this.$route.params.id,
      // 歌手详情
      artistDetail: {},
      // 歌手专辑
      artistAlbum: {},
      // 歌手MV
      artistMv: [],
      // 歌手介绍
      artistDesc: {},
      // 相似歌手
      sameArtist: [],
      // 选中导航
      activeIndex: "1",
    };
  },
  computed: {
    ...mapGetters([
      // 加载状态
      "isLoading",
    ]),
  },
  methods: {
    // 获取歌手细节
    getArtistDetail() {
      this.$http
        .get("artist/detail", {
          params: {
            id: this.artistId,
          },
        })
        .then((res) => {
          console.log(res.data);
          this.artistDetail = res.data.data;
        });
    },
    // 获取歌手专辑
    getArtistAlbum(page) {
      this.$store.dispatch("changeIsLoading", true);
      this.$http
        .get("artist/album", {
          params: {
            id: this.artistId,
            limit: 16,
            offset: page * 16,
          },
        })
        .then((res) => {
          // console.log(res.data);
          this.artistAlbum = res.data;
          this.$store.dispatch("changeIsLoading", false);
        });
    },
    // 获取歌手mv
    getArtistMv(page) {
      this.$store.dispatch("changeIsLoading", true);
      this.$http
        .get("artist/mv", {
          params: {
            id: this.artistId,
            limit: 15,
            offset: page * 15,
          },
        })
        .then((res) => {
          // console.log(res.data);
          this.artistMv = res.data.mvs;
          this.$store.dispatch("changeIsLoading", false);
        });
    },
    // 获取歌手描述
    getArtistDesc() {
      this.$http
        .get("artist/desc", {
          params: {
            id: this.artistId,
          },
        })
        .then((res) => {
          // console.log(res.data);
          this.artistDesc = res.data;
        });
    },
    // 获取相似歌手
    getSameArtist() {
      this.$http
        .get("simi/artist", {
          params: {
            id: this.artistId,
          },
        })
        .then((res) => {
          // console.log(res.data);
          this.sameArtist = res.data.artists;
        });
    },
    // 改变导航栏
    changeActive(index) {
      this.activeIndex = index;
    },
  },
  created() {
    this.getArtistDetail();
    this.getArtistAlbum(0);
    this.getArtistMv(0);
    this.getArtistDesc();
    this.getSameArtist();
  },
};
</script>

<style scoped>
.artistPage {
  height: 100vh;
  width: 100%;
  overflow-y: hidden;
  overflow-x: hidden;
  padding-right: 17px;
  padding-left: 3px;
}
.artistPage:hover {
  overflow-y: overlay;
}
</style>
