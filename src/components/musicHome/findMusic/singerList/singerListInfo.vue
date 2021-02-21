<template>
  <div class="singerListInfo">
    <div id="recomSongDiv">
      <!-- 歌单 -->
      <div
        id="recomItem"
        v-for="(item, index) in singerList"
        :key="index"
        style="margin-bottom: 30px"
      >
        <div id="playDetail">
          <!-- 歌单封面 -->
          <el-image
            :src="item.img1v1Url"
            fit="fill"
            style="border-radius: 10px; height: 180px"
            @click="toArtistPage(item.id)"
          >
            <div slot="placeholder" class="image-slot">
              <i class="el-icon-loading" style="font-size: 170px"></i>
            </div>
          </el-image>
        </div>
        <!-- 歌单介绍 -->
        <div class="playListIntro">
          <p id="playIntro" @click="toArtistPage(item.id)">{{ item.name }}</p>
          <!-- 歌手图标 -->
          <img
            v-show="item.accountId"
            src="@/assets/image/singer.svg"
            alt=""
            style="
              width: 22px;
              background: #ef4542;
              border-radius: 40px;
              position: absolute;
              right: 1%;
              top: 46%;
              transform: translateY(-50%);
            "
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "singerListInfo",
  components: {},
  props: {
    // 遍历的歌手数据
    singerList: Array,
  },
  data() {
    return {};
  },
  methods: {
    //点击歌手跳转界面
    toArtistPage(id) {
      this.$router.push("/musicHome/artistPage/" + id);
    },
  },
};
</script>

<style scoped>
/* 布局 */

#recomSongDiv {
  position: relative;
  display: grid;
  width: 100%;
  grid-template-columns: repeat(6, 1fr);
  column-gap: 40px;
  margin-top: 30px;
}
/* .el-row {
        margin-bottom: 20px;
    }
    
    .el-col:last-child {
        margin-bottom: 0;
    } */
/* .el-col {
        width: 20%;
    } */
/* 歌单介绍 */

.playListIntro {
  position: relative;
  height: 50px;
  overflow: hidden;
}

#playIntro {
  font-size: 15px;
  cursor: pointer;
  color: #373737;
  opacity: 0.9;
}

#playIntro:hover {
  opacity: 1;
  color: #000000;
}
/* 歌单封面 */

#playDetail {
  display: inline-block;
  width: 100%;
  position: relative;
  cursor: pointer;
}

#playImg {
  display: inline-block;
  width: 35px;
  height: 35px;
  border-radius: 100%;
  background: #f2f3f4;
}
/* 播放键出现 */

.playAppear {
  display: block;
  position: absolute;
  bottom: 5%;
  right: 5%;
  animation-name: play;
  animation-duration: 0.8s;
  animation-iteration-count: 1;
  animation-fill-mode: forwards;
}
/* 播放动画 */

@keyframes play {
  0% {
    opacity: 0;
  }
  100% {
    opacity: 1;
  }
}

.playNone {
  display: none;
}
</style>
