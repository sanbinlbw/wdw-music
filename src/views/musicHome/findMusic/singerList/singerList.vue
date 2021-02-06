<template>
  <div class="infinite-list-wrapper" style="overflow: auto">
    <singerTag
      @getSingerInfo="getSingerInfo"
      ref="singerTag"
      @cleanSingerInfo="cleanSingerInfo"
    />
    <div v-loading="isLoading" element-loading-text="加载中...">
      <singerListInfo
        :singerList="singerList"
        v-infinite-scroll="load"
        class="infinite-list-item"
      />
    </div>
    <br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br />
  </div>
</template>

<script>
import singerListInfo from "@/components/musicHome/findMusic/singerList/singerListInfo";
import singerTag from "@/components/musicHome/findMusic/singerList/singerTag";
import { mapGetters, mapMutations, mapActions } from "vuex";
export default {
  name: "singerList",
  components: {
    // 歌手信息
    singerListInfo,
    // 歌手标签
    singerTag,
  },
  computed: {
    ...mapGetters([
      // 加载状态
      "isLoading",
    ]),
  },
  data() {
    return {
      // 歌手数据
      singerList: [],
      // 是否有更多
      more: true,
      // 当前页数
      page: 0,
    };
  },
  methods: {
    // 请求歌手数据
    getSingerInfo(type, area, initial, page) {
      this.$store.dispatch("changeIsLoading", true);
      this.$http
        .get("/artist/list", {
          params: {
            type: type,
            area: area,
            initial: initial,
            limit: 12,
            offset: page * 12,
          },
        })
        .then((res) => {
          // console.log(res.data);
          this.singerList = this.singerList.concat(res.data.artists);
          this.more = res.data.more;
          this.$store.dispatch("changeIsLoading", false);
        });
    },
    // 清空歌手数据
    cleanSingerInfo() {
      this.singerList = [];
    },
    // 滚动到底继续请求数据
    load() {
      if (this.more === false) return;
      this.getSingerInfo(
        this.$refs.singerTag.languageTag,
        this.$refs.singerTag.genderTag,
        this.$refs.singerTag.firTag,
        this.page
      );
      this.page++;
    },
  },
  created() {},
};
</script>

<style scoped></style>
