<template>
  <div class="mvList">
    <el-row :gutter="60">
      <el-col
        :span="8"
        v-for="(item, index) in mvList"
        :key="index"
        style="margin-bottom: 30px"
      >
        <!-- mv封面 -->
        <div id="mvDetail">
          <el-image
            :src="item.cover"
            fit="fill"
            style="width: 100%; height: 220px; border-radius: 8px"
            @click="toVideoPage(item.id)"
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
              item.playCount >= 10000
                ? (item.playCount / 10000).toFixed(0) + "万"
                : item.playCount
            }}
          </div>
        </div>
        <!-- mv介绍 -->
        <div id="mvIntro">
          <p id="mvName" @click="toVideoPage(item.id)">{{ item.name }}</p>
          <p id="mvArtistName">by {{ item.artistName }}</p>
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
export default {
  name: "mvList",
  components: {},
  props: {
    mvList: Array,
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
