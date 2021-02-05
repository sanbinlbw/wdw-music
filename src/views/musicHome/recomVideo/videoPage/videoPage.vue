<template>
  <div class="videoPage">
    <!-- <div class="tag">
      当前标签
      <div class="tagChoose" @click="isAllTags = !isAllTags">{{ tagKind }} ></div>
      热门标签
      <div class="hotTags">
        <span
          v-for="(item, index) in hotTags"
          :key="index"
          :class="{ actHotTag: tagKind === item.name, hotTag: tagKind !== item.name }"
          @click="selectTag(item.name)"
        >
          {{ item.name }}
        </span>
      </div>
    </div> -->
  </div>
</template>

<script>
export default {
  name: "videoPage",
  components: {},
  data() {
    return {};
  },
  methods: {
    // 推荐视频数据
    getRecomVideo() {
      this.$store.dispatch("changeIsLoading", true);
      this.$http
        .get("video/timeline/recommend", {
          params: {
            offset: 1,
          },
        })
        .then((res) => {
          console.log(res);
          // this.playLists = res.data.playlists;
          // this.count = res.data.total;
          this.$store.dispatch("changeIsLoading", false);
        })
        .catch((error) => {
          this.$message.error("请登录后再使用该功能哟");
          //打开登录窗口
      this.$store.dispatch("changeShowLogin", true);
        });
    },
  },
  created() {
    this.getRecomVideo();
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
}
</style>
