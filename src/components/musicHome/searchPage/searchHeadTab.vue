<template>
  <div class="searchHeadTab">
    <el-menu
      :default-active="this.$route.path"
      class="el-menu-demo"
      mode="horizontal"
      :router="true"
    >
      <el-menu-item index="/musicHome/searchPage/searchBySong">单曲</el-menu-item>
      <el-menu-item index="/musicHome/searchPage/searchBySinger">歌手</el-menu-item>
      <el-menu-item index="/musicHome/searchPage/searchByAlbum">专辑</el-menu-item>
      <el-menu-item index="/musicHome/searchPage/searchByVideo">视频</el-menu-item>
    </el-menu>
  </div>
</template>

<script>
export default {
  name: "searchHeadTab",
  components: {},
  data() {
    return {};
  },
};
</script>

<style scoped>
/* 点击出来的下划线进行修改 */

.el-menu-item.is-active {
  border-color: #ec4141;
  font-size: 20px;
  font-weight: 400;
}
/* 整体的下划线进行隐藏 */

.el-menu.el-menu--horizontal {
  border-bottom: none;
}
</style>
