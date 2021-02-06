<template>
  <div class="videoPage">
    <div class="tag">
      <!-- 当前标签 -->
      <div class="tagChoose" @click="isAllTags = !isAllTags">{{ tagKind }} ></div>
      <!-- 热门标签 -->
      <div class="hotTags">
        <span
          v-for="(item, index) in hotTags"
          :key="index"
          :class="{ actHotTag: tagKind === item.name, hotTag: tagKind !== item.name }"
          @click="selectTag(item, 0)"
        >
          {{ item.name }}
        </span>
      </div>
    </div>
    <div v-loading="isLoading" element-loading-text="加载中...">
      <videoListInfo
        :videoList="videoList"
        :tagKind="tagKind"
        :allTags="allTags"
        @selectTag="selectTag"
        @getRecomVideo="getRecomVideo"
        :isAllTags="isAllTags"
      />
    </div>
    <br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br />
  </div>
</template>

<script>
import { mapGetters, mapMutations, mapActions } from "vuex";
import videoListInfo from "@/components/musicHome/recomVideo/video/videoListInfo";
export default {
  name: "videoPage",
  components: {
    videoListInfo,
  },
  computed: {
    ...mapGetters([
      // 加载状态
      "isLoading",
      // 用户数据
      "userInfo",
    ]),
  },
  data() {
    return {
      // 当前标签
      tagKind: "全部视频",
      // 热门标签
      hotTags: [],
      // 全部标签
      allTags: [],
      // 是否展开全部标签
      isAllTags: false,
      // 当前视频数据
      videoList: [],
    };
  },
  methods: {
    // 推荐视频热门标签
    getRecomVideoHotTag() {
      this.$http
        .get("/video/category/list")
        .then((res) => {
          console.log(res.data);
          this.hotTags = res.data.data;
        })
        .catch((error) => {
          this.$message.error("请登录后再使用该功能哟");
          //打开登录窗口
          this.$store.dispatch("changeShowLogin", true);
        });
    },
    // 推荐视频数据
    getRecomVideo(id, page) {
      if (page == 0) this.videoList = [];
      this.$store.dispatch("changeIsLoading", true);
      this.$http
        .get("/video/group", {
          params: {
            id: id,
            offset: page,
          },
        })
        .then((res) => {
          console.log(res.data);
          for (let data of res.data.datas) {
            this.videoList.push(data);
          }
          this.$store.dispatch("changeIsLoading", false);
        })
        .catch((error) => {});
    },
    // 全部推荐视频数据
    getAllRecomVideo(page) {
      if (!this.userInfo) {
        this.$message.error("请登录后再使用该功能哟");
        //打开登录窗口
        this.$store.dispatch("changeShowLogin", true);
        return;
      }
      if (page == 0) this.videoList = [];
      this.$store.dispatch("changeIsLoading", true);
      this.$http
        .get("/video/timeline/all", {
          params: {
            offset: page,
          },
        })
        .then((res) => {
          console.log(res.data);
          for (let data of res.data.datas) {
            this.videoList.push(data);
          }
          this.$store.dispatch("changeIsLoading", false);
        })
        .catch((error) => {});
    },
    // 推荐视频数据
    getAllRecomVideoTag() {
      this.$store.dispatch("changeIsLoading", true);
      this.$http
        .get("/video/group/list")
        .then((res) => {
          console.log(res.data);
          this.allTags = res.data.data;
          this.$store.dispatch("changeIsLoading", false);
        })
        .catch((error) => {
          this.$message.error("请登录后再使用该功能哟");
          //打开登录窗口
          this.$store.dispatch("changeShowLogin", true);
        });
    },
    // 选中标签
    selectTag(item) {
      if (this.tagKind !== item.name) {
        this.tagKind = item.name;
        this.getRecomVideo(item.id, 0);
        this.isAllTags = false;
      }
    },
  },
  created() {
    this.getRecomVideoHotTag();
    this.getAllRecomVideoTag();
    this.getAllRecomVideo(0);
  },
};
</script>

<style scoped>
/* 选择标签 */
.tagChoose {
  position: absolute;
  width: 120px;
  height: 35px;
  line-height: 35px;
  text-align: center;
  border: 1px solid rgba(0, 0, 0, 0.2);
  border-radius: 30px;
  color: #373737;
  cursor: pointer;
}
.tagChoose:hover {
  background: #f2f2f2;
}
/* 热门标签 */
.hotTags {
  height: 35px;
  line-height: 40px;
  position: absolute;
  right: 5%;
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
.tag {
  width: 100%;
  height: 40px;
  position: relative;
  margin-bottom: 30px;
}
</style>
