<template>
  <div class="searchByVideo">
    <div class="page">
      <el-pagination background layout="prev, pager, next" :total="1000" :pager-count="9">
      </el-pagination>
    </div>
    <br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br />
  </div>
</template>

<script>
export default {
  name: "searchByVideo",
  components: {},
  data() {
    return {};
  },
};
</script>

<style>
.page {
  margin-left: 50%;
  transform: translateX(-50%);
}

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
