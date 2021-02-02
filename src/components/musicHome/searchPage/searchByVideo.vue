<template>
  <div class="searchByVideo">
    <div class="noSearch" v-if="!songAll.videoCount">
      很抱歉，没有找到您搜索信息的任何相关视频。
    </div>
    <div v-else>
      <el-row :gutter="60">
        <el-col
          :span="8"
          v-for="(item, index) in songAll.videoList"
          :key="index"
          style="margin-bottom: 30px"
        >
          <!-- mv封面 -->
          <div id="mvDetail">
            <el-image
              :src="item.coverUrl"
              fit="fill"
              style="width: 100%; height: 220px; border-radius: 8px"
              @click="toVideoPage(item.vid)"
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
                item.playTime >= 10000
                  ? (item.playTime / 10000).toFixed(0) + "万"
                  : item.playTime
              }}
            </div>
          </div>
          <!-- mv介绍 -->
          <div id="mvIntro">
            <p id="mvName" @click="toVideoPage(item.vid)">{{ item.title }}</p>
            <p id="mvArtistName">by {{ item.creator[0].userName }}</p>
          </div>
        </el-col>
      </el-row>
      <div class="page">
        <pagination
          :count="songAll.videoCount"
          :pageNum="24"
          @getSongPage="getSongPage"
        />
      </div>
      <br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br />
    </div>
  </div>
</template>

<script>
import pagination from "./pagination";
export default {
  name: "searchByVideo",
  components: { pagination },
  props: {
    // 歌曲搜索信息
    songAll: Object,
  },
  data() {
    return {};
  },
  methods: {
    //获取指定页数歌曲
    getSongPage(offset, type) {
      this.$emit("getSongPage", offset, type);
    },
    //点击视频跳转界面
    toVideoPage(id) {
      this.$router.push("/musicHome/videoPage/" + id);
    },
  },
  created() {
    this.getSongPage(0, "Video");
  },
};
</script>

<style scoped>
/* 当搜索不到时页面展示 */
.noSearch {
  display: grid;
  align-content: center;
  justify-content: center;
  width: 70vw;
  height: 60vh;
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
  overflow: hidden;
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
