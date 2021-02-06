<template>
  <div class="allMv">
    <div style="font-weight: 500; font-size: 25px; margin-bottom: 30px; margin-left: 2%">
      全部MV
    </div>
    <!-- mv标签 -->
    <mvTag
      :languageTag="languageTag"
      :genderTag="genderTag"
      :firTag="firTag"
      @getMvList="getMvList"
      @backNumOne="backNumOne"
    />
    <!-- mv列表 -->
    <div v-loading="isLoading" element-loading-text="加载中...">
      <mvList :mvList="mvList" />
    </div>
    <pagination
    ref="pagination"
      :count="mvCount"
      @getMvList="getMvList"
      :languageTag="languageTag"
      :genderTag="genderTag"
      :firTag="firTag"
    />
    <br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br />
  </div>
</template>

<script>
import pagination from "@/components/musicHome/allMv/pagination";
import mvTag from "@/components/musicHome/allMv/mvTag";
import mvList from "@/components/musicHome/allMv/mvList";
import { mapGetters, mapMutations, mapActions } from "vuex";
export default {
  name: "allMv",
  components: {
    mvTag,
    mvList,
    pagination,
  },
  computed: {
    ...mapGetters([
      // 加载状态
      "isLoading",
    ]),
  },
  data() {
    return {
      // 当前选中标签
      languageTag: this.$route.query.languageTag ? this.$route.query.languageTag : "全部",
      genderTag: this.$route.query.genderTag ? this.$route.query.genderTag : "全部",
      firTag: this.$route.query.firTag ? this.$route.query.firTag : "上升最快",
      // mv数据
      mvList: [],
      // mv总数
      mvCount: 0,
    };
  },
  methods: {
    // 获取mv数据
    getMvList(languageTag, genderTag, firTag, page) {
      this.$store.dispatch("changeIsLoading", true);
      this.languageTag = languageTag;
      this.genderTag = genderTag;
      this.firTag = firTag;
      this.$http
        .get("/mv/all", {
          params: {
            area: languageTag,
            type: genderTag,
            order: firTag,
            limit: 30,
            offset: page * 30,
          },
        })
        .then((res) => {
          // console.log(res.data);
          this.mvList = res.data.data;
          if (page === 0) {
            this.mvCount = res.data.count;
          }
          this.$store.dispatch("changeIsLoading", false);
        });
    },
    //返回第一页
    backNumOne() {
      this.$refs.pagination.backNumOne();
    },
  },
  created() {
    this.getMvList(this.languageTag, this.genderTag, this.firTag, 0);
  },
};
</script>

<style scoped>
.allMv {
  height: 100vh;
  width: 100%;
  overflow-y: hidden;
  overflow-x: hidden;
  padding-right: 17px;
  padding-left: 3px;
}
.allMv:hover {
  overflow-y: overlay;
}
</style>
