<template>
  <div class="searchByVideo">
    <div class="noSearch" v-if="!songAll.videoCount">
      很抱歉，没有找到您搜索信息的任何相关视频。
    </div>
    <div v-else>
      <div class="page">
        <pagination
          :count="songAll.videoCount"
          :pageNum="24"
          @getSongPage="getSongPage"
        />
      </div>
      <br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br />
    </div>
  </div>
</template>

<script>
import pagination from "./pagination";
export default {
  name: "searchByVideo",
  components: { pagination },
  props: {
    // 歌曲搜索信息
    songAll: Object,
  },
  data() {
    return {};
  },
  methods: {
    //获取指定页数歌曲
    getSongPage(offset, type) {
      this.$emit("getSongPage", offset, type);
    },
  },
  created() {
    this.getSongPage(0, "Video");
  },
};
</script>

<style scoped>
/* 当搜索不到时页面展示 */
.noSearch {
  display: grid;
  align-content: center;
  justify-content: center;
  width: 70vw;
  height: 60vh;
}
.page {
  margin-left: 53%;
  transform: translateX(-50%);
}
</style>
