<template>
  <div class="leftNav">
    <el-col>
      <el-menu
        :router="true"
        active-text-color="#000000"
        :default-active="
          '/' + this.$route.path.split('/')[1] + '/' + this.$route.path.split('/')[2]
        "
        class="el-menu-vertical-demo"
        text-color="#5c5c5c"
        @open="handleOpen"
        @close="handleClose"
      >
        <p class="leftNavFont">推荐</p>
        <div>
          <el-menu-item index="/musicHome/findMusic">
            <i class="iconfont icon-music"></i>
            <span slot="title">发现音乐</span>
          </el-menu-item>
          <el-menu-item index="/musicHome/recomVideo">
            <i class="iconfont icon-video" style="color: #000000 !important"></i>
            <span slot="title">推荐视频</span>
          </el-menu-item>
        </div>
        <p class="leftNavFont">我的音乐</p>
        <div>
          <el-menu-item index="/musicHome/myCloudMusic">
            <i class="iconfont icon-yun"></i>
            <span slot="title">我的音乐云盘</span>
          </el-menu-item>
        </div>
        <p class="leftNavFont">创建的歌单</p>
        <div>
          <el-menu-item
            v-for="(item, i) in personalList"
            :key="i"
            :index="'/musicHome/songList/' + item.id"
          >
            <i
              :class="{
                'iconfont icon-heart': i == 0,
                'iconfont icon-ziyuanldpi': i != 0,
              }"
            ></i>
            <span slot="title">{{ item.name }}</span>
          </el-menu-item>
        </div>
      </el-menu>
      <br /><br /><br /><br /><br /><br /><br /><br /><br />
    </el-col>
  </div>
</template>

<script>
import { mapGetters, mapMutations, mapActions } from "vuex";
export default {
  name: "leftNav",
  components: {},
  computed: {
    ...mapGetters([
      //用户歌单
      "personalList",
    ]),
  },
  data() {
    return {};
  },
  methods: {
    handleOpen(key, keyPath) {
      console.log(key, keyPath);
    },
    handleClose(key, keyPath) {
      console.log(key, keyPath);
    },
  },
  created() {},
};
</script>

<style scoped>
.el-col {
  height: 100vh;
  width: 100%;
  overflow-y: hidden;
  overflow-x: hidden;
}
.el-col:hover {
  overflow-y: overlay;
}
.leftNavFont {
  opacity: 0.5;
  font-weight: 50;
  font-size: 13px;
  margin-left: 10px;
}

.iconfont {
  margin-right: 10px;
}

.el-menu-item.is-active {
  background-color: #e6e7ea !important;
}

.el-menu-item:hover {
  background: #e6e7ea !important;
  color: #000000 !important;
}
</style>
