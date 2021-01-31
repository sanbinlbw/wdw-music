<template>
  <div class="mvPage">
    <!-- 最新MV -->
    <div style="margin-bottom: 2%">
      <span style="font-weight: 500; font-size: 25px; cursor: pointer"> 最新MV ></span>
    </div>
    <newMv :newMv="newMv" />
    <!-- 热播MV -->
    <div style="margin-bottom: 2%">
      <span style="font-weight: 500; font-size: 25px; cursor: pointer"> 热播MV ></span>
    </div>
    <hotMv :hotMv="hotMv" />
    <!-- 网易推荐MV -->
    <div style="margin-bottom: 2%">
      <span style="font-weight: 500; font-size: 25px; cursor: pointer"> 网易出品 ></span>
    </div>
    <neteaseMv :neteaseMv="neteaseMv" />
    <br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br />
  </div>
</template>

<script>
import newMv from "@/components/musicHome/recomVideo/MV/newMv";
import hotMv from "@/components/musicHome/recomVideo/MV/hotMv";
import neteaseMv from "@/components/musicHome/recomVideo/MV/neteaseMv";
export default {
  name: "mvPage",
  components: {
    newMv,
    hotMv,
    neteaseMv,
  },
  data() {
    return {
      // 最新mv
      newMv: [],
      // 最热mv
      hotMv: [],
      // 网页mv
      neteaseMv: [],
    };
  },
  methods: {
    // 最新MV数据
    getNewMv(tag) {
      this.$http
        .get("mv/first", {
          params: {
            limit: 6,
            area: tag,
          },
        })
        .then((res) => {
          console.log(res.data);
          this.newMv = res.data.data;
        })
        .catch((error) => {
          console.log(error);
        });
    },
    // 热播MV数据
    getHotMv(tag) {
      this.$http
        .get("mv/all", {
          params: {
            limit: 6,
            area: tag,
            order: "最热",
          },
        })
        .then((res) => {
          console.log(res.data);
          this.hotMv = res.data.data;
        })
        .catch((error) => {
          console.log(error);
        });
    },
    // 网易出品MV
    getNeteaseMv() {
      this.$http
        .get("mv/exclusive/rcmd", {
          params: {
            limit: 6,
          },
        })
        .then((res) => {
          console.log(res.data);
          this.neteaseMv = res.data.data;
        })
        .catch((error) => {
          console.log(error);
        });
    },
    // mv排行榜
    getMvPlayList(tag) {
      this.$http
        .get("top/mv", {
          params: {
            limit: 10,
            area: tag,
          },
        })
        .then((res) => {
          console.log(res.data);
          // this.neteaseMv = res.data.data;
        })
        .catch((error) => {
          console.log(error);
        });
    },
  },
  created() {
    this.getNewMv("内地");
    this.getHotMv("全部");
    this.getNeteaseMv();
    this.getMvPlayList("内地");
  },
};
</script>

<style scoped></style>
