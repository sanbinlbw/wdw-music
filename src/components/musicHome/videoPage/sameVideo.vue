<template>
  <div class="sameVideo">
    <!-- mv封面 -->
    <div id="mvDetail" v-for="(item, index) in sameVideo" :key="index">
      <el-image
        :src="item.coverUrl"
        fit="fill"
        style="
          width: 50%;
          height: 150px;
          border-radius: 8px;
          vertical-align: middle;
          cursor: pointer;
        "
        @click="toVideoPage(item.vid)"
      ></el-image>
      <!-- mv介绍 -->
      <div id="mvIntro">
        <p id="mvName" @click="toVideoPage(item.vid)">
          {{ item.title }}
        </p>
        <p id="mvArtistName">by {{ item.creator[0].userName }}</p>
      </div>
      <div
        style="
          position: absolute;
          top: 15px;
          right: 52%;
          color: #ffffff;
          text-shadow: 0px 0px 2px #000000; ;
        "
      >
        <!-- 播放量 -->
        <i
          class="iconfont icon-bofang"
          style="width: 15px; height: 15px; border-radius: 100%; margin-bottom: -1.5px"
        ></i>
        {{
          item.playTime >= 100000
            ? (item.playTime / 10000).toFixed(0) + "万"
            : item.playTime
        }}
      </div>
      <div
        style="
          position: absolute;
          bottom: 15px;
          right: 52%;
          color: #ffffff;
          text-shadow: 0px 0px 2px #000000; ;
        "
      >
        <!-- 时长 -->
        {{ (item.durationms / 1000) | timeFormat }}
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "sameVideo",
  components: {},
  props: {
    sameVideo: Array,
  },
  data() {
    return {};
  },
  methods: {
    //点击视频跳转界面
    toVideoPage(id) {
      this.$router.push("/musicHome/videoPage/" + id);
    },
  },
};
</script>

<style scoped>
/* 视频布局 */
.searchVideo {
  width: 100%;
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  column-gap: 10px;
}
#mvDetail {
  width: 100%;
  padding: 10px 0;
  position: relative;
  overflow: hidden;
}
#mvName {
  width: 200px;
  font-size: 15px;
  cursor: pointer;
  color: #373737;
  opacity: 0.9;
  margin-bottom: 20%;
  /* 超出省略 */
  overflow: hidden;
  text-overflow: ellipsis;
  line-clamp: 2;
  -webkit-box-orient: vertical;
}

#mvName:hover,
#mvArtistName:hover {
  opacity: 1;
  color: #000000;
}
#mvArtistName {
  font-size: 13px;
  cursor: pointer;
  color: #373737;
  opacity: 0.6;
}
#mvIntro {
  position: absolute;
  top: 15%;
  left: 53%;
}
</style>
