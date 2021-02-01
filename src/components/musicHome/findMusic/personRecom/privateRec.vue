<template>
  <div class="privateRec">
    <!-- 独家推送 -->
    <el-row :gutter="40">
      <el-col :span="8" v-for="(item, index) in privateList" :key="index">
        <!-- 推送封面 -->
        <div id="privateDetail">
          <el-image
            :src="item.sPicUrl"
            fit="fill"
            style="height: 200px; border-radius: 8px"
            @click="toVideoPage(item.id)"
          ></el-image>
          <div style="position: absolute; top: 8%; left: 4%; opacity: 0.8">
            <img
              src="@/assets/image/play.svg"
              alt=""
              style="width: 30px; height: 30px; background: #aca8a1; border-radius: 100%"
            />
          </div>
        </div>
        <!-- 推送介绍 -->
        <div id="privateIntro">
          <p id="introName" @click="toVideoPage(item.id)">{{ item.name }}</p>
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
export default {
  name: "privateRec",
  props: {
    privateList: Array,
  },
  components: {},
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
#privateDetail {
  position: relative;
  cursor: pointer;
}

#introName {
  font-size: 20px;
  cursor: pointer;
  color: #2c2c2d;
  opacity: 0.9;
}

#introName:hover {
  opacity: 1;
  color: #000000;
}
</style>
