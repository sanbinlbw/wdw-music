<template>
  <div class="videoListInfo">
    <!-- 所有标签选择 -->
    <allTags
      v-show="isAllTags"
      :tagKind="tagKind"
      @selectTag="selectTag"
      :allTags="allTags"
    />
    <el-row :gutter="60">
      <el-col
        :span="8"
        v-for="(item, index) in videoList"
        :key="index"
        style="margin-bottom: 30px"
      >
        <!-- mv封面 -->
        <div id="mvDetail">
          <el-image
            :src="item.data.coverUrl"
            fit="fill"
            style="width: 100%; height: 220px; border-radius: 8px"
            @click="toVideoPage(item.data.vid)"
          ></el-image>
          <div
            style="
              position: absolute;
              top: 5%;
              right: 3%;
              color: #ffffff;
              text-shadow: 0px 0px 2px #000000; ;
            "
          >
            <!-- 播放量 -->
            <i
              class="iconfont icon-bofang"
              style="
                width: 15px;
                height: 15px;
                border-radius: 100%;
                margin-bottom: -1.5px;
              "
            ></i>
            {{
              item.data.playTime >= 100000
                ? (item.data.playTime / 10000).toFixed(0) + "万"
                : item.data.playTime
            }}
          </div>
        </div>
        <!-- mv介绍 -->
        <div id="mvIntro">
          <p id="mvName" @click="toVideoPage(item.data.vid)">{{ item.data.title }}</p>
          <p id="mvArtistName">by {{ item.data.creator.nickname }}</p>
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import allTags from "./allTags";
export default {
  name: "videoListInfo",
  components: {
    // 所有标签
    allTags,
  },
  props: {
    // 遍历的歌单
    videoList: Array,
    // 当前标签
    tagKind: String,
    // 所有标签信息
    allTags: Array,
    // 判断全部标签是否打开
    isAllTags: Boolean,
  },
  data() {
    return {
      // 判断鼠标悬停
      currentIndex: -1,
      // 请求页数
      page: 0,
    };
  },
  methods: {
    // 鼠标移入
    addPlay(index) {
      this.currentIndex = index;
    },
    // 鼠标移出
    reducePlay() {
      this.currentIndex = -1;
    },
    //点击歌单跳转界面
    toVideoPage(id) {
      this.$router.push("/musicHome/videoPage/" + id);
    },
    selectTag(item) {
      this.$emit('selectTag',item)
    },
  },
};
</script>

<style scoped>
.videoListInfo {
  position: relative;
  width: 100%;
}
/* 视频布局 */
.searchVideo {
  width: 100%;
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  column-gap: 10px;
}
#mvDetail {
  width: 100%;
  position: relative;
  cursor: pointer;
  overflow: hidden;
}
#mvName {
  font-size: 15px;
  cursor: pointer;
  color: #373737;
  opacity: 0.9;
  white-space: nowrap;
  text-overflow: ellipsis;
  /* overflow: hidden; */
  word-break: break-all;
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
</style>
