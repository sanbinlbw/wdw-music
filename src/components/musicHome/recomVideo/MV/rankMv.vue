<template>
  <div class="rankMv">
    <el-row :gutter="60">
      <el-col
        :span="12"
        v-for="(item, index) in rankMv"
        :key="index"
        style="margin-bottom: 30px"
      >
        <!-- mv封面 -->
        <div id="mvDetail">
          <span
            style="font-size: 40px; color: #9f9f9f; font-weight: 500; cursor: default"
          >
            {{ index >= 9 ? index + 1 : "0" + (index + 1) }}
          </span>
          <el-image
            :src="item.cover"
            fit="fill"
            style="
              width: 50%;
              height: 200px;
              border-radius: 8px;
              vertical-align: middle;
              cursor: pointer;
            "
            @click="toVideoPage(item.id)"
          ></el-image>
          <!-- mv介绍 -->
          <div id="mvIntro">
            <p id="mvName" @click="toVideoPage(item.id)">
              {{ item.name }}
            </p>
            <p id="mvArtistName">by {{ item.artistName }}</p>
          </div>
          <div
            style="
              position: absolute;
              top: 5%;
              right: 44%;
              color: #ffffff;
              text-shadow: 0px 0px 2px #000000; ;
            "
          >
            <!-- 播放量 -->
            <i
              class="iconfont icon-renqiredu"
              style="
                width: 15px;
                height: 15px;
                border-radius: 100%;
                margin-bottom: -1.5px;
              "
            ></i>
            {{ item.score }}
          </div>
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
export default {
  name: "rankMv",
  components: {},
  props: {
    rankMv: Array,
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
  overflow: hidden;
}
#mvName {
  width: 200px;
  font-size: 15px;
  cursor: pointer;
  color: #373737;
  opacity: 0.9;
  margin-bottom: 40px;
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
#mvIntro {
  position: absolute;
  top: 20%;
  left: 65%;
}
</style>
