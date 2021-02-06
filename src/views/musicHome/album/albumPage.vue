<template>
  <div class="albumPage">
    <!-- 歌单细节 -->
    <albumDetail :albumDetail="albumDetail" :songs="songs" />
    <!-- 导航栏 -->
    <menuTab ref="menuTab" @changeActive="changeActive" :commentCount="comment.total" />
    <!-- 歌曲列表 -->
    <div v-loading="isLoading" element-loading-text="加载中...">
      <musicList v-show="activeIndex === '1'" :songs="songs" />
      <!-- 评论 -->
      <comment
        :comment="comment"
        :currentId="currentId"
        v-show="activeIndex === '2'"
        @getCommentPage="getCommentPage"
      />
      <!-- 详情 -->
      <describe v-show="activeIndex === '3'" :description="albumDetail.description" />
    </div>
    <br /><br /><br /><br /><br /><br />
  </div>
</template>

<script>
import { mapGetters, mapMutations, mapActions } from "vuex";
import albumDetail from "@/components/musicHome/album/albumDetail";
import menuTab from "@/components/musicHome/album/menuTab";
import musicList from "@/components/musicHome/album/musicList";
import comment from "@/components/musicHome/album/comment";
import describe from "@/components/musicHome/album/describe";
export default {
  name: "albumPage",
  components: {
    albumDetail,
    menuTab,
    musicList,
    comment,
    describe,
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
      albumDetail: {},
      // 导航页面
      activeIndex: "1",
      // 歌曲数据
      songs: [],
      // 评论数据
      comment: {},
    };
  },
  methods: {
    // 获取专辑详情数据
    async getAlbumDetail() {
      this.$store.dispatch("changeIsLoading", true);
      await this.$http
        .get("album", {
          params: {
            id: this.currentId,
          },
        })
        .then((res) => {
          // console.log(res.data);
          this.albumDetail = res.data.album;
          this.songs = res.data.songs;
        });
      this.getCommentPage(0);
    },
    // 获取评论数据
    getCommentPage(page) {
      this.$store.dispatch("changeIsLoading", true);
      this.$http
        .get("comment/album", {
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
          // console.log(res.data);
          this.$store.dispatch("changeIsLoading", false);
        });
    },
    // 改变导航栏
    changeActive(index) {
      this.activeIndex = index;
    },
  },
  created() {
    this.getAlbumDetail();
  },
};
</script>

<style scoped>
.albumPage {
  height: 100vh;
  width: 100%;
  overflow-y: hidden;
  overflow-x: hidden;
  padding-right: 17px;
  padding-left: 3px;
}
.albumPage:hover {
  overflow-y: overlay;
}
</style>
