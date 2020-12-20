<template>
  <div class="searchByPlayList">
    <div class="page">
      <el-pagination background layout="prev, pager, next" :total="1000" :pager-count="9">
      </el-pagination>
    </div>
    <br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br />
  </div>
</template>

<script>
    export default {
        name: "searchByPlayList",
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
    /* 每行歌曲样式 */
    
    .songMesSin {
        position: relative;
        width: 100%;
        height: 50px;
        line-height: 50px;
        color: #363636;
        opacity: 0.8;
    }
    
    .songMesDou {
        position: relative;
        width: 100%;
        height: 50px;
        line-height: 50px;
        color: #363636;
        opacity: 0.8;
        background: #f9f9f9;
    }
    
    .songMesSin:hover,
    .songMesDou:hover {
        background: #f4f4f4;
    }
</style>