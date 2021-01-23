<template>
  <div class="songList">
    <div class="tag"></div>
  </div>
</template>

<script>
export default {
  name: "songList",
  components: {},
  data() {
    return {};
  },
  methods: {
    //获取热门歌单标签信息
    getHotMusicListTags() {
      this.$http.get("playlist/hot").then((res) => {
        // this.hotMusicListTags = res.data.tags
        console.log(res.data);
      });
    },
    //获取所有歌单标签信息
    getAllMusicListTags() {
      this.$http.get("playlist/catlist").then((res) => {
        // this.hotMusicListTags = res.data.tags
        console.log(res.data);
      });
    },
    //获取精品歌单
    getGoodMusicList() {
      this.$http.get("/top/playlist", { params: this.queryInfo }).then((res) => {
        console.log(res.data);
        // this.goodMusicList = res.data.playlists
        // this.goodMusicListTotal = res.data.total
      });
    },
  },
  created() {
    // 资源获取
    this.getHotMusicListTags();
    this.getAllMusicListTags();
    this.getGoodMusicList();
  },
};
</script>

<style scoped>
.tag {
  width: 100%;
  position: relative;
}
</style>
