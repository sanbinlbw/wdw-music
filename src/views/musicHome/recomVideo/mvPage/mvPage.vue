<template>
  <div class="mvPage">
    <!-- 最新MV -->
    <div style="margin-bottom: 2%; position: relative; width: 100%">
      <span
        style="font-weight: 500; font-size: 25px; cursor: pointer"
        @click="
          $router.push({
            name: 'allMv',
            query: { languageTag: '内地', genderTag: '全部', firTag: '最新' },
          })
        "
      >
        最新MV ></span
      >
      <!-- 热门标签 -->
      <div class="hotTags">
        <span
          v-for="(item, index) in HotTags"
          :key="index"
          :class="{
            actHotTag: newTagKind === item,
            hotTag: newTagKind !== item,
          }"
          @click="selectTag(item, 'newMv')"
        >
          {{ item }}
        </span>
      </div>
    </div>
    <div v-loading="isLoading" element-loading-text="加载中...">
      <newMv :newMv="newMv" />
    </div>
    <!-- 热播MV -->
    <div style="margin-bottom: 2%">
      <span
        style="font-weight: 500; font-size: 25px; cursor: pointer"
        @click="
          $router.push({
            name: 'allMv',
            query: { languageTag: '全部', genderTag: '全部', firTag: '最热' },
          })
        "
      >
        热播MV ></span
      >
    </div>
    <hotMv :hotMv="hotMv" />
    <!-- 网易推荐MV -->
    <div style="margin-bottom: 2%">
      <span
        style="font-weight: 500; font-size: 25px; cursor: pointer"
        @click="
          $router.push({
            name: 'allMv',
            query: { languageTag: '全部', genderTag: '网易出品', firTag: '最新' },
          })
        "
      >
        网易出品 ></span
      >
    </div>
    <neteaseMv :neteaseMv="neteaseMv" />
    <!-- MV排行榜 -->
    <div style="margin-bottom: 2%; position: relative; width: 100%">
      <span style="font-weight: 500; font-size: 25px; cursor: pointer"> MV排行榜 ></span>
      <!-- 热门标签 -->
      <div class="hotTags">
        <span
          v-for="(item, index) in HotTags"
          :key="index"
          :class="{
            actHotTag: rankTagKind === item,
            hotTag: rankTagKind !== item,
          }"
          @click="selectTag(item, 'rankMv')"
        >
          {{ item }}
        </span>
      </div>
    </div>
    <div v-loading="isRankLoading" element-loading-text="加载中...">
      <rankMv :rankMv="rankMv" />
    </div>
    <br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br />
  </div>
</template>

<script>
import newMv from "@/components/musicHome/recomVideo/MV/newMv";
import hotMv from "@/components/musicHome/recomVideo/MV/hotMv";
import neteaseMv from "@/components/musicHome/recomVideo/MV/neteaseMv";
import rankMv from "@/components/musicHome/recomVideo/MV/rankMv";
import { mapGetters, mapMutations, mapActions } from "vuex";
export default {
  name: "mvPage",
  components: {
    newMv,
    hotMv,
    neteaseMv,
    rankMv,
  },
  computed: {
    ...mapGetters([
      // 加载状态
      "isLoading",
    ]),
  },
  data() {
    return {
      // 最新mv
      newMv: [],
      // 最新mv标签
      newTagKind: "内地",
      // 最新mv的热门标签
      HotTags: ["内地", "港台", "欧美", "日本", "韩国"],
      // 最热mv
      hotMv: [],
      // 网易云mv
      neteaseMv: [],
      // MV排行榜
      rankMv: [],
      // 排行榜的标签
      rankTagKind: "内地",
      // 排行榜加载
      isRankLoading: false,
    };
  },
  methods: {
    // 最新MV数据
    getNewMv(tag) {
      this.$store.dispatch("changeIsLoading", true);
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
          this.$store.dispatch("changeIsLoading", false);
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
      this.isRankLoading = true;
      this.$http
        .get("top/mv", {
          params: {
            limit: 10,
            area: tag,
          },
        })
        .then((res) => {
          console.log(res.data);
          this.rankMv = res.data.data;
          this.isRankLoading = false;
        })
        .catch((error) => {
          console.log(error);
        });
    },
    selectTag(tag, type) {
      if (type == "newMv") {
        if (this.newTagKind !== tag) {
          this.newTagKind = tag;
          this.getNewMv(tag);
        }
      } else if (type == "rankMv") {
        if (this.rankTagKind !== tag) {
          this.rankTagKind = tag;
          this.getMvPlayList(tag);
        }
      }
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

<style scoped>
/* 热门标签 */
.hotTags {
  height: 35px;
  line-height: 40px;
  position: absolute;
  right: 5%;
  top: 0;
}
.hotTag {
  margin-left: 30px;
  font-size: 13px;
  opacity: 0.8;
  cursor: pointer;
}
.hotTag:hover {
  opacity: 1;
}
/* 标签被选中时 */
.actHotTag {
  color: #d03535;
  margin-left: 30px;
  padding: 5px;
  font-size: 13px;
  border-radius: 10px;
  cursor: pointer;
  background: #fcf4f4;
}
</style>
