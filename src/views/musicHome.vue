<template>
  <div class="musicHome" @click="closeSuggest">
    <el-container>
      <!-- 头部 -->
      <el-header>
        <img src="../assets/image/demo.svg" alt="" id="musicDemo" />
        <span>似音流年</span>
        <div id="back">
          <i
            class="el-icon-arrow-left"
            @click="$router.go(-1)"
            style="cursor: pointer"
          ></i>
        </div>
        <div id="searchDiv" @mouseenter="isClose = false" @mouseleave="isClose = true">
          <el-input
            style="opacity: 0.5"
            placeholder="请输入歌曲名或歌手名"
            size="mini"
            v-model="searchData"
            @keyup.enter.native="search"
            @focus="showSuggest = true"
          />
          <i class="elsearch el-icon-search" @click="search"></i>
          <!-- 搜索建议 -->
          <div class="searchSuggest" v-show="showSuggest">
            <div style="opacity: 0.6; font-size: 18px" v-show="searchHistory.length > 0">
              搜索历史
              <i
                class="iconfont icon-act_qingkong"
                style="cursor: pointer"
                @click="deleteAllSearchHistory()"
              ></i>
            </div>
            <!-- 历史标签 -->
            <div>
              <div class="historyTag" v-for="(item, index) in searchHistory" :key="index">
                {{ item }}
                <i class="el-icon-close" @click="deleteSearchHistory(item)"></i>
              </div>
            </div>
          </div>
        </div>
        <loginBar style="position: absolute; right: 5%" />
      </el-header>
      <el-container>
        <!-- 左部导航栏 -->
        <el-aside width="16%"><leftNav /></el-aside>
        <!-- 展示路由 -->
        <el-main
          ><router-view ref="child" :searchData="searchData" v-show="!isEgg"
        /></el-main>
      </el-container>
    </el-container>
    <!-- 播放器 -->
    <musicPlay ref="musicPlay" @isShowSongList="isShowSongList" />
    <!-- 播放列表弹出层 -->
    <songTable
      ref="songTable"
      v-show="showSongList"
      @getNextSong="getNextSong"
      @cleanDur="cleanDur"
    />
    <!-- 彩蛋 -->
    <div class="egg" v-show="isEgg">
      <loveLetter />
      <loveHeart :loveModel="loveModel" />
    </div>
  </div>
</template>

<script>
import leftNav from "@/components/musicHome/leftNav/leftNav";
import loginBar from "@/components/musicHome/leftNav/loginBar";
import musicPlay from "@/components/musicHome/musicPlay/musicPlay";
import songTable from "@/components/musicHome/musicPlay/songTable";
import loveLetter from "@/components/musicHome/playAnimation/loveLetter";
import loveHeart from "@/components/musicHome/playAnimation/loveHeart";
import { mapGetters, mapMutations, mapActions } from "vuex";
export default {
  name: "musicHome",
  components: {
    leftNav,
    loginBar,
    musicPlay,
    songTable,
    loveLetter,
    loveHeart,
  },
  data() {
    return {
      //是否显示歌单
      showSongList: false,
      //搜索框
      searchData: "",
      //彩蛋触发
      isEgg: false,
      //心动模式
      loveModel: false,
      //搜索建议
      showSuggest: false,
      //是否能关闭
      isClose: false,
    };
  },
  computed: {
    ...mapGetters([
      //当前播放歌曲url
      "musicUrl",
      //当前播放歌曲详情
      "musicDetail",
      //当前歌曲id
      "songId",
      //当前歌单
      "playList",
      //历史歌曲播放列表
      "hisMusicList",
      //播放过的歌曲歌单(避免上一首或者随机播放播放到重复的歌曲)
      "hasPlayList",
      //搜索历史
      "searchHistory",
    ]),
  },
  methods: {
    //搜索并跳转到搜索界面
    search() {
      //女朋友要求彩蛋
      if (this.searchData === "@crl是个憨批@") {
        this.isEgg = true;
        // 开启心动模式
        this.loveModel = true;
        setTimeout(() => {
          this.isEgg = false;
        }, 16000);
        return;
      }
      // 解除心动模式
      if (this.searchData === "@crl不是憨批@") {
        this.loveModel = false;
        return;
      }
      //判断为空不进行搜索
      if (this.searchData.trim() === "") return;
      // 关闭搜索建议
      this.showSuggest = false;
      //保存当前搜索数据到vuex
      this.$store.dispatch("saveSearchInfo", this.searchData);
      this.$store.dispatch("saveSearchHistory", this.searchData);
      //跳转到搜索界面
      if (this.$route.path !== "/musicHome/searchPage/searchBySong") {
        this.$router.push({
          name: "searchPage",
        });
      }
      //调用搜索页获取数据
      this.$refs.child.getSongPage(0, "Song");
      this.$refs.child.backNumOne();
    },
    //删除全部搜索记录
    deleteAllSearchHistory() {
      this.$store.dispatch("deleteAllSearchHistory");
    },
    //删除单个搜索记录
    deleteSearchHistory(item) {
      this.$store.dispatch("deleteSearchHistory", item);
    },
    //是否展示歌单
    isShowSongList() {
      this.showSongList = !this.showSongList;
    },
    //播放下一首歌曲
    getNextSong() {
      this.$refs.musicPlay.getNextSong();
    },
    //清空播放栏的歌曲时长
    cleanDur() {
      this.$refs.musicPlay.cleanDur();
    },
    //关闭搜索建议
    closeSuggest() {
      if (!this.isClose) return;
      this.showSuggest = false;
    },
  },
  created() {},
  mounted() {},
};
</script>

<style>
.el-header {
  display: flex;
  position: relative;
  background: #c62f2f;
  padding-top: 5px;
}
#musicDemo {
  width: 40px;
  height: 40px;
  margin-top: 5px;
  margin-left: 20px;
}

.el-header span {
  width: 100px;
  margin-left: 10px;
  margin-top: 15px;
  font-weight: 500;
  font-size: 20px;
  color: #ffffff;
}
/* 搜索框 */

#searchDiv {
  position: relative;
  width: 305px;
  margin-top: -10px;
}
/* 搜索建议 */
.searchSuggest {
  position: absolute;
  margin-top: 5px;
  left: 15%;
  width: 120%;
  padding: 20px;
  height: 300px;
  z-index: 100;
  border-radius: 2%;
  box-shadow: #f0f0f0 0px 0px 1px 1px;
  background: #fff;
}
/* 历史标签 */
.historyTag {
  display: inline-block;
  margin-top: 20px;
  margin-right: 10px;
  border-radius: 20px;
  border: 1px solid #d8d8d8;
  padding: 5px 10px;
  opacity: 0.7;
  cursor: pointer;
}
.historyTag:hover {
  background: #f2f2f2;
}
.el-header .el-input__inner {
  opacity: 0.5;
  margin-top: 25px;
  margin-left: 50px;
  width: 225px;
  height: 23px;
  border-radius: 12px;
}

.elsearch {
  position: absolute;
  right: 13%;
  top: 45%;
  cursor: pointer;
  opacity: 0.5;
  color: aliceblue;
}
/* 回退键 */

#back {
  width: 25px;
  height: 25px;
  text-align: center;
  line-height: 25px;
  margin-top: 13px;
  margin-left: 30px;
  color: #ffffff;
  background: rgba(77, 71, 71, 0.1);
  border-radius: 50%;
}
/* 滑块 */

.el-slider__button {
  width: 10px !important;
  height: 10px !important;
  border: 2px solid rgb(198, 47, 47) !important;
}

.el-slider__runway {
  background: #c2c2c4;
}

.el-slider__bar {
  background-color: #ff4e4e;
}

.volume .el-slider__button {
  width: 5px !important;
  height: 5px !important;
  border: 1px solid #ec4141 !important;
  background: #ec4141;
}

.volume .el-slider__runway {
  background: #e6e6e8;
}
/* 菜单 */
.egg {
  position: absolute;
  /* width: 580px; */
  /* height: 580px; */
  top: 5%;
  left: 50%;
  transform: translateX(-50%);
  z-index: 5201314;
}
</style>
