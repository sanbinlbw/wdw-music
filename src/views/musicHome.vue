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
                <span style="color: #000; font-size: 15px" @click="toSearch(item)">{{
                  item
                }}</span>
                <i class="el-icon-close" @click="deleteSearchHistory(item)"></i>
              </div>
            </div>
            <!-- 热搜榜 -->
            <div
              style="opacity: 0.6; font-size: 18px; margin-top: 20px; margin-bottom: 20px"
            >
              热搜榜
            </div>
            <div
              class="hotSearch"
              v-for="(item, index) in hotSearchList"
              :key="index"
              @click="toSearch(item.searchWord)"
            >
              <div
                style="position: absolute; width: 10%; top: 35%; left: 5%"
                :class="{ frontTir: index <= 2, other: index > 2 }"
              >
                {{ index + 1 }}
              </div>
              <div
                style="
                  display: grid;
                  grid-template-rows: repeat(2,1fr);
                  position: absolute;
                  height: 100%;
                  width:80%
                  top: 0;
                  left: 15%;
                "
              >
                <div style="margin-top: 5%">
                  <div
                    style="
                      font-size: 15px;
                      font-weight: 540;
                      display: inline-block;
                      margin-right: 5%;
                    "
                  >
                    {{ item.searchWord }}
                  </div>
                  <img
                    v-show="item.iconUrl"
                    :src="item.iconUrl"
                    alt=""
                    style="width: 28px; height: 15px; margin-bottom: -1%"
                  />
                  <span style="color: #cfcfcf; font-size: 12px">{{ item.score }}</span>
                </div>
                <div style="font-size: 12px; color: #9f9f9f; margin-top: 3%">
                  {{ item.content }}
                </div>
              </div>
            </div>
          </div>
        </div>
        <loginBar style="position: absolute; right: 5%; top: 20%" />
      </el-header>
      <el-container>
        <!-- 左部导航栏 -->
        <el-aside width="20%"><leftNav /></el-aside>
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
    <!-- 登录页 -->
    <login v-show="!userInfo && showLogin" />
  </div>
</template>

<script>
import leftNav from "@/components/musicHome/leftNav/leftNav";
import loginBar from "@/components/musicHome/leftNav/loginBar";
import login from "@/components/musicHome/login/login";
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
    login,
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
      //热搜列表
      hotSearchList: [],
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
      //个人信息
      "userInfo",
      //是否展示登录
      "showLogin",
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
    // 选取历史记录搜索
    toSearch(item) {
      this.searchData = item;
      this.search();
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
    //获取热搜列表
    getHotSearch() {
      this.$http.get("/search/hot/detail").then((res) => {
        console.log(res.data);
        this.hotSearchList = res.data.data;
      });
    },
    //打开登录窗口
    changeShowLogin(isShow) {
      this.$store.dispatch("changeShowLogin", isShow);
    },
  },
  created() {
    this.getHotSearch();
  },
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
  padding: 20px 15px;
  height: 400px;
  z-index: 100;
  overflow-y: overlay;
  overflow-y: auto;
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
/* 热搜列表 */
.hotSearch {
  position: relative;
  width: 100%;
  height: 20%;
  cursor: pointer;
}
.hotSearch:hover {
  background: #f2f2f2;
}
.frontTir {
  color: #ff3b3b;
}
.other {
  color: #cfcfcf;
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
