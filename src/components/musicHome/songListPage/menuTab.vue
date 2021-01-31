<template>
  <div class="menuTab">
    <el-menu :default-active="activeIndex" class="el-menu-demo" mode="horizontal">
      <el-menu-item index="1" @click="changeActive('1')">歌曲列表</el-menu-item>
      <el-menu-item index="2" @click="changeActive('2')"
        >评论({{ commentCount }})</el-menu-item
      >
    </el-menu>
  </div>
</template>

<script>
export default {
  name: "menuTab",
  components: {},
  props: {
    // 评论总数
    commentCount: Number,
  },
  data() {
    return {
      // 高亮菜单
      activeIndex: "1",
    };
  },
  methods: {
    changeActive(index) {
      this.activeIndex = index;
      this.$emit("changeActive", index);
    },
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
