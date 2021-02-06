<template>
  <div class="playList">
    <div v-loading="isLoading" element-loading-text="加载中...">
      <!-- 官方榜 -->
      <p style="font-size: 25px">官方榜</p>
      <div>
        <officialList
          :officialListInfo="officialListInfo"
          :artistToplistInfo="artistToplistInfo"
        />
      </div>
      <p style="font-size: 25px">全球榜</p>
      <div>
        <globalList :globalListInfo="globalListInfo" />
      </div>
    </div>
    <br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br />
  </div>
</template>

<script>
import officialList from "@/components/musicHome/findMusic/playList/officialList";
import globalList from "@/components/musicHome/findMusic/playList/globalList";
import { mapGetters, mapMutations, mapActions } from "vuex";
export default {
  name: "playList",
  components: {
    // 官方榜
    officialList,
    // 全球榜
    globalList,
  },
  computed: {
    ...mapGetters([
      // 加载状态
      "isLoading",
    ]),
  },
  data() {
    return {
      // 官方榜数据
      officialListInfo: [],
      // 全球榜数据
      globalListInfo: [],
      // 歌手榜数据
      artistToplistInfo: {},
    };
  },
  methods: {
    //获得官方榜单的数据
    getRankList() {
      this.$store.dispatch("changeIsLoading", true);
      this.$http.get("toplist/detail").then((res) => {
        // console.log(res.data);
        this.officialListInfo = res.data.list.slice(0, 4);
        this.artistToplistInfo = res.data.artistToplist;
        this.globalListInfo = res.data.list.slice(4);
        this.$store.dispatch("changeIsLoading", false);
      });
    },
  },
  created() {
    //获取官方榜单数据
    this.getRankList();
  },
};
</script>

<style scoped></style>
