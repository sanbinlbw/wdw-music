<template>
  <div class="pagination">
    <el-pagination
      background
      layout="prev, pager, next"
      :total="Math.ceil(count / pageNum) * 10"
      :pager-count="9"
      @current-change="getSongPage"
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
    //每页总数
    pageNum:Number
  },
  components: {},
  data() {
    return {};
  },
  methods: {
    //获取指定页歌曲
    // getSongPage(Page) {
    //   this.$emit("getSongPage", Page - 1, this.$route.path.slice(30));
    // },
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
</style>
