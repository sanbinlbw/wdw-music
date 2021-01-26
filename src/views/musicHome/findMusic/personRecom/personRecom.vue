<template>
  <div class="personRecom">
    <!-- 轮播图 -->
    <div id="banner">
      <banner :bannerInfo="bannerInfo" @changeUrl="changeUrl"></banner>
    </div>
    <!-- 推荐歌单 -->
    <el-divider content-position="left"
      ><p style="font-size: 20px">推荐歌单</p></el-divider
    >
    <div id="recomSong">
      <recomSong :recomSongList="recomSongList"></recomSong>
    </div>
    <!-- 独家放送 -->
    <el-divider content-position="left"
      ><p style="font-size: 20px">独家放送</p></el-divider
    >
    <div id="private">
      <privateRec :privateList="privateList"></privateRec>
    </div>
    <!-- 最新音乐 -->
    <el-divider content-position="left"
      ><p style="font-size: 20px">最新音乐</p></el-divider
    >
    <div id="newSong">
      <newSong :newSongList="newSongList" @changeUrl="changeUrl"></newSong>
    </div>
    <!-- 推荐mv -->
    <el-divider content-position="left"><p style="font-size: 20px">推荐MV</p></el-divider>
    <div id="mvRecom">
      <mvRecom :mvRecomList="mvRecomList"></mvRecom>
    </div>
    <br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br />
  </div>
</template>

<script>
import banner from "@/components/musicHome/findMusic/personRecom/banner";
import recomSong from "@/components/musicHome/findMusic/personRecom/recomSong";
import privateRec from "@/components/musicHome/findMusic/personRecom/privateRec";
import newSong from "@/components/musicHome/findMusic/personRecom/newSong";
import mvRecom from "@/components/musicHome/findMusic/personRecom/mvRecom";
import { mapGetters, mapMutations, mapActions } from "vuex";
export default {
  name: "personRecom",
  components: {
    recomSong,
    banner,
    privateRec,
    newSong,
    mvRecom,
  },
  data() {
    return {
      //轮播图列表
      bannerInfo: [],
      //推荐歌单列表
      recomSongList: [],
      // 独家放送列表
      privateList: [],
      // 最新音乐列表
      newSongList: [],
      //mv推荐列表
      mvRecomList: [],
      //播放的音乐url
      misicUrl: "",
      // 音乐详情
      musicDetail: {},
    };
  },
  computed: {
    ...mapGetters([
      // 当前播放列表
      "playList",
    ]),
  },
  created() {},
  mounted() {
    // 获取轮播图
    this.getBannerInfo();
    // 获取推荐歌单
    this.getRecomSongList();
    // 获取独家放送
    this.getPrivateList();
    // 获取最新音乐
    this.getNewSongList();
    // 获取mv推荐
    this.getMvRecomList();
  },
  methods: {
    //获取轮播图数据
    getBannerInfo() {
      this.$http.get("banner").then((res) => {
        if (res.status !== 200) this.$message.error("轮播图获取失败");
        this.bannerInfo = res.data.banners;
      });
    },
    // 点击播放音乐传入音乐id
    async changeUrl(musicId) {
      if (musicId === null) return;
      // 获得音乐url
      await this.getMusicUrl(musicId);
      // 获得音乐详情
      await this.getMusicDetail(musicId);
      //url为空时提醒没有版权
      if (this.musicUrl === null) {
        const h = this.$createElement;
        this.$message.error({
          message: h("p", null, [
            h("span", null, "您暂无收听该歌曲权限"),
            h(
              "i",
              {
                style: "color: red",
              },
              ""
            ),
          ]),
          offset: 280,
          center: true,
          showClose: true,
        });
        return;
      }
      // url为空时不提交到vuex
      if (this.musicUrl !== "") {
        // 保存到当前播放路径
        this.$store.dispatch("saveMusicUrl", this.musicUrl);
        // 保存到当前播放歌曲详情
        this.$store.dispatch("saveMusicDetail", this.musicDetail);
        // 保存到当前播放歌曲id
        this.$store.dispatch("saveSongId", this.musicDetail.id);
        // 放入历史歌单
        this.$store.dispatch("deleteHisListSong", this.musicDetail.id);
        this.$store.dispatch("unshiftHisMusicList", this.musicDetail);
        // 放入已经播放过的歌单
        this.$store.dispatch("deleteHasListSong", this.musicDetail.id);
        this.$store.dispatch("pushHasPlayList", this.musicDetail);
        // 放入当前播放歌单
        for (let song of this.playList) {
          if (song.id === this.musicDetail.id) {
            const h = this.$createElement;
            this.$message.error({
              message: h("p", null, [
                h("span", null, "列表中已存在该歌曲"),
                h(
                  "i",
                  {
                    style: "color: red",
                  },
                  ""
                ),
              ]),
              offset: 280,
              center: true,
              showClose: true,
            });
            return;
          }
        }
        this.$store.dispatch("pushPlayList", this.musicDetail);
      }
    },
    //根据id获取音乐url
    async getMusicUrl(musicId) {
      await this.$http
        .get("song/url", {
          params: {
            id: musicId,
          },
        })
        .then((res) => {
          if (res.data.data[0].freeTrialInfo) {
            this.$store.dispatch("saveAur", [
              res.data.data[0].freeTrialInfo.start,
              res.data.data[0].freeTrialInfo.end,
            ]);
          } else {
            this.$store.dispatch("saveAur", [-1, 0]);
          }
          this.musicUrl = res.data.data[0].url;
        });
    },
    //根据id获取音乐详情
    async getMusicDetail(musicId) {
      await this.$http
        .get("song/detail", {
          params: {
            ids: musicId,
          },
        })
        .then((res) => {
          this.musicDetail = res.data.songs[0];
        });
    },
    //获取推荐歌单
    getRecomSongList() {
      this.$http
        .get("/personalized", {
          params: {
            limit: 10,
          },
        })
        .then((res) => {
          this.recomSongList = res.data.result;
        });
      // 随机取出精品歌单,避免数据是流动的
      // this.$http.get('/top/playlist', {
      //     params: {
      //         offset: (Math.random() * 1297).toFixed(0) - 10,
      //         limit: 10
      //     }
      // }).then(res => {
      //     this.recomSongList = res.data.playlists;
      //     console.log(res.data.playlists);
      // })
    },
    //获取独家放送
    getPrivateList() {
      this.$http.get("/personalized/privatecontent").then((res) => {
        this.privateList = res.data.result;
      });
    },
    // 获取最新音乐
    getNewSongList() {
      this.$http
        .get("/personalized/newsong", {
          params: {
            limit: 12,
          },
        })
        .then((res) => {
          this.newSongList = res.data.result;
        });
    },
    // 获取mv推荐
    getMvRecomList() {
      this.$http.get("/personalized/mv").then((res) => {
        this.mvRecomList = res.data.result;
        this.mvRecomList.pop();
      });
    },
  },
};
</script>

<style scoped></style>
