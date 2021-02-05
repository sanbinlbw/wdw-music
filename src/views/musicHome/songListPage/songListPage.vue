<template>
  <div class="songListPage">
    <!-- 歌单细节 -->
    <listDetail :playList="playList" :songsDetail="songsDetail" />
    <!-- 导航栏 -->
    <menuTab ref="menuTab" @changeActive="changeActive" :commentCount="comment.total" />
    <!-- 歌曲列表 -->
    <div v-loading="isLoading" element-loading-text="加载中...">
      <musicList v-show="activeIndex === '1'" :songsDetail="songsDetail" />
      <!-- 评论 -->
      <comment
        :comment="comment"
        v-show="activeIndex === '2'"
        @getCommentPage="getCommentPage"
        :currentId = "currentId"
      />
      <!-- 收藏者 -->
    </div>
    <br /><br /><br /><br /><br /><br />
  </div>
</template>

<script>
import { mapGetters, mapMutations, mapActions } from "vuex";
import listDetail from "@/components/musicHome/songListPage/listDetail";
import menuTab from "@/components/musicHome/songListPage/menuTab";
import musicList from "@/components/musicHome/songListPage/musicList";
import comment from "@/components/musicHome/songListPage/comment";
export default {
  name: "songListPage",
  components: {
    listDetail,
    menuTab,
    musicList,
    comment,
  },
  watch: {
    $route: function (newVal, oldVal) {
      this.currentId = newVal.params.id;
      if (newVal.params.id != oldVal.params.id) {
        this.queryIds = "";
        this.getPlayListDetail();
      }
    },
  },
  computed: {
    ...mapGetters([
      // 加载状态
      "isLoading",
    ]),
  },
  data() {
    return {
      // 传入的id
      currentId: this.$route.params.id,
      // 歌单数据
      playList: {},
      // 导航页面
      activeIndex: "1",
      // 请求的歌曲id
      queryIds: "",
      // 歌曲数据
      songsDetail: {},
      // 评论数据
      comment: {},
    };
  },
  methods: {
    // 获取歌单详情数据
    async getPlayListDetail() {
      this.$store.dispatch("changeIsLoading", true);
      await this.$http
        .get("playlist/detail", {
          params: {
            id: this.currentId,
          },
        })
        .then((res) => {
          console.log(res.data);
          this.playList = res.data.playlist;
          this.playList.trackIds.forEach((item) => {
            this.queryIds += item.id + ",";
          });
        });
      this.getSongDetail();
      this.getCommentPage(0);
    },
    // 获取歌曲数据
    getSongDetail() {
      this.$http
        .get("song/detail", {
          params: {
            ids: this.queryIds.substr(0, this.queryIds.length - 1),
          },
        })
        .then((res) => {
          console.log(res.data);
          this.songsDetail = res.data;
        });
    },
    // 获取评论数据
    getCommentPage(page) {
      this.$store.dispatch("changeIsLoading", true);
      this.$http
        .get("comment/playlist", {
          params: {
            id: this.currentId,
            limit: 20,
            offset: page * 20,
          },
        })
        .then((res) => {
          if (page == 0) {
            this.comment = res.data;
          } else {
            this.comment.comments = res.data.comments;
          }
          console.log(res.data);
          this.$store.dispatch("changeIsLoading", false);
        });
    },
    // 改变导航栏
    changeActive(index) {
      this.activeIndex = index;
    },
  },
  created() {
    this.getPlayListDetail();
  },
};
</script>

<style scoped>
.songListPage {
  height: 100vh;
  width: 100%;
  overflow-y: hidden;
  overflow-x: hidden;
  padding-right: 17px;
  padding-left: 3px;
}
.songListPage:hover {
  overflow-y: overlay;
}
</style>
