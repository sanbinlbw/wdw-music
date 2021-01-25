<template>
  <div class="pagination">
    <el-pagination
      background
      layout="prev, pager, next"
      :total="Math.ceil(count / 50) * 10"
      :pager-count="9"
      @current-change="getSongListPage"
      :current-page.sync="currentPage"
    >
    </el-pagination>
  </div>
</template>

<script>
export default {
  name: "pagination",
  props: {
    //分页总数
    count: Number,
    //歌单种类
    tagKind: String,
  },
  components: {},
  data() {
    return {
      //最新页
      currentPage: 1,
    };
  },
  methods: {
    //获取指定页歌单
    getSongListPage(Page) {
      this.$emit("getSongListPage", this.tagKind, Page - 1);
    },
    //返回第一页
    backNumOne() {
      this.currentPage = 1;
    },
  },
};
</script>

<style>
/*带背景的分页按钮背景色begin*/
.el-pagination.is-background .el-pager li:not(.disabled).active {
  background-color: #ec4141;
  color: #fff;
}
.el-pagination.is-background .el-pager li.active {
  color: #fff;
  cursor: default;
}
.el-pagination.is-background .el-pager li:hover {
  color: #ec4141;
}
.el-pagination.is-background .el-pager li:not(.disabled):hover {
  color: #ec4141;
}
.el-pagination.is-background .el-pager li:not(.disabled).active:hover {
  background-color: #ec4141;
  color: #fff;
}
/* 分页样式 */
.pagination {
  margin-left: 53%;
  transform: translateX(-50%);
}
</style>
