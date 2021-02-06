<template>
  <div class="videoPage">
    <div class="videoDetail">
      <p style="font-weight: 600; font-size: 20px; cursor: pointer">MV详情</p>
      <video width="95%" height="500px" controls :src="videoUrl" autoplay></video>
      <!-- 作者信息 -->
      <div class="creator">
        <!-- 作者头像 -->
        <el-image
          :src="type == 'mv' ? videoDetail.cover : videoDetail.avatarUrl"
          fit="fill"
          style="
            border-radius: 40px;
            height: 80px;
            width: 80px;
            vertical-align: middle;
            margin-right: 10px;
          "
        ></el-image>
        <!-- 作者名 -->
        <span v-if="type == 'mv'">
          <span v-for="(item, index) in videoDetail.artists" :key="index"
            ><span class="creatorName">{{ item.name }}</span
            >{{ index + 1 === videoDetail.artists.length ? "" : " / " }}</span
          >
        </span>
        <span v-else class="creatorName">{{ videoDetail.creator.nickname }}</span>
      </div>
      <!-- 介绍 -->
      <p style="font-weight: 600; font-size: 28px; cursor: pointer">
        {{ type == "mv" ? videoDetail.name : videoDetail.title }}
        <i
          v-show="!isIntro"
          @click="isIntro = true"
          class="el-icon-caret-bottom"
          style="cursor: pointer"
        ></i>
        <i
          v-show="isIntro"
          @click="isIntro = false"
          class="el-icon-caret-top"
          style="cursor: pointer"
        ></i>
      </p>
      <div style="opacity: 0.4">
        <div style="display: inline-block; margin-right: 20px">
          发布：{{
            type == "mv" ? videoDetail.publishTime : videoDetail.publishTime | dateFormat
          }}
        </div>
        <div style="display: inline-block">
          播放：{{
            type == "mv"
              ? videoDetail.playCount >= 100000
                ? (videoDetail.playCount / 10000).toFixed(0) + "万"
                : videoDetail.playCount
              : videoDetail.playTime >= 100000
              ? (videoDetail.playTime / 10000).toFixed(0) + "万"
              : videoDetail.playTime
          }}
        </div>
      </div>
      <!-- 介绍详情 -->
      <p v-show="isIntro" style="opacity: 0.9">
        {{ type == "mv" ? videoDetail.desc : videoDetail.description }}
      </p>
      <!-- 按钮 -->
      <div class="playAllSong">
        <div class="orbtn">
          <i class="iconfont Add a document icon-Adddocument" style="font-size: 15px"></i>
          收藏({{
            type == "mv"
              ? videoDetail.subCount >= 100000
                ? (videoDetail.subCount / 10000).toFixed(0) + "万"
                : videoDetail.subCount
              : videoDetail.subscribeCount >= 100000
              ? (videoDetail.subscribeCount / 10000).toFixed(0) + "万"
              : videoDetail.subscribeCount
          }})
        </div>
        <div class="orbtn" v-if="type == 'mv'">
          <i class="iconfont icon-fenxiang" style="font-size: 15px"></i> 分享({{
            videoDetail.shareCount >= 100000
              ? (videoDetail.shareCount / 10000).toFixed(0) + "万"
              : videoDetail.shareCount
          }})
        </div>
        <div class="orbtn" v-else>
          <i class="iconfont icon-dianzan" style="font-size: 15px"></i> 点赞({{
            videoDetail.praisedCount >= 100000
              ? (videoDetail.praisedCount / 10000).toFixed(0) + "万"
              : videoDetail.praisedCount
          }})
        </div>
      </div>
      <!-- 评论 -->
      <p style="font-weight: 600; font-size: 20px; cursor: pointer">
        评论({{ comment.total }})
      </p>
      <div v-loading="isLoading" element-loading-text="加载中...">
        <comment
          :comment="comment"
          @getVideoComment="getVideoComment"
          :videoId="videoId"
        />
      </div>
      <br /><br /><br /><br /><br /><br /><br />
    </div>
    <div class="sameRecom">
      <p style="font-weight: 600; font-size: 20px; cursor: pointer">相关推荐</p>
      <sameVideo :sameVideo="sameVideo" />
    </div>
  </div>
</template>

<script>
import { mapGetters, mapMutations, mapActions } from "vuex";
import comment from "@/components/musicHome/videoPage/comment";
import sameVideo from "@/components/musicHome/videoPage/sameVideo";
export default {
  name: "videoPage",
  components: {
    comment,
    sameVideo,
  },
  computed: {
    ...mapGetters([
      // 加载状态
      "isLoading",
    ]),
  },
  watch: {
    $route: function (newVal, oldVal) {
      this.videoId = newVal.params.id;
      if (newVal.params.id != oldVal.params.id) {
        if (isNaN(this.videoId)) {
          this.type = "video";
        } else {
          this.type = "mv";
        }
        this.getVideoDetail();
        this.getVideoUrl();
        this.getSameVideo();
        this.getVideoComment(0);
      }
    },
  },
  data() {
    return {
      // 视频id
      videoId: this.$route.params.id,
      // 视频url
      videoUrl: "",
      // 视频详情
      videoDetail: {},
      // 是否展开介绍
      isIntro: false,
      // 评论
      comment: {},
      // 类型
      type: "mv",
      // 相关视频
      sameVideo: [],
    };
  },
  methods: {
    //获取当前的视频详细数据
    getVideoDetail() {
      if (this.type == "video") {
        this.$http.get("video/detail", { params: { id: this.videoId } }).then((res) => {
          console.log(res.data);
          this.videoDetail = res.data.data;
        });
      } else {
        this.$http.get("mv/detail", { params: { mvid: this.videoId } }).then((res) => {
          console.log(res.data);
          this.videoDetail = res.data.data;
        });
      }
    },
    //获取视频的url
    getVideoUrl() {
      if (this.type == "video") {
        this.$http.get("video/url", { params: { id: this.videoId } }).then((res) => {
          this.videoUrl = res.data.urls[0].url;
          console.log(res.data);
        });
      } else {
        this.$http.get("mv/url", { params: { id: this.videoId } }).then((res) => {
          this.videoUrl = res.data.data.url;
          console.log(res.data);
        });
      }
    },
    // 获取当前视频的评论数据
    getVideoComment(page) {
      this.$store.dispatch("changeIsLoading", true);
      if (this.type == "video") {
        this.$http
          .get("/comment/video", {
            params: { id: this.videoId, limit: 20, offset: page * 20 },
          })
          .then((res) => {
            console.log(res.data);
            if (page == 0) {
              this.comment = res.data;
            } else {
              this.comment.comments = res.data.comments;
            }
            this.$store.dispatch("changeIsLoading", false);
          });
      } else {
        this.$http
          .get("/comment/mv", {
            params: { id: this.videoId, limit: 20, offset: page * 20 },
          })
          .then((res) => {
            console.log(res.data);
            if (page == 0) {
              this.comment = res.data;
            } else {
              this.comment.comments = res.data.comments;
            }
            this.$store.dispatch("changeIsLoading", false);
          });
      }
    },
    //获取相关的mv
    getSameVideo() {
      this.$http
        .get("/related/allvideo", { params: { id: this.videoId } })
        .then((res) => {
          console.log(res.data);
          this.sameVideo = res.data.data;
        });
    },
  },
  created() {
    if (isNaN(this.videoId)) {
      this.type = "video";
    } else {
      this.type = "mv";
    }
    this.getVideoDetail();
    this.getVideoUrl();
    this.getSameVideo();
    this.getVideoComment(0);
  },
};
</script>

<style scoped>
.videoPage {
  height: 100vh;
  width: 100%;
  overflow-y: hidden;
  overflow-x: hidden;
  padding-right: 17px;
  padding-left: 3px;
}
.videoPage:hover {
  overflow-y: overlay;
}
.videoDetail {
  width: 65%;
  float: left;
}
.sameRecom {
  width: 35%;
  float: left;
}
.creator {
  margin-top: 20px;
}
.creatorName {
  opacity: 0.8;
  cursor: pointer;
}
.creatorName:hover {
  opacity: 1;
}
.playAllSong {
  margin-top: 25px;
  margin-bottom: 60px;
}
.orbtn {
  display: inline-block;
  margin-right: 10px;
  border-radius: 20px;
  border: 1px solid #d8d8d8;
  padding: 5px 15px;
  cursor: pointer;
}
.orbtn:hover {
  background: #f2f2f2;
}
</style>
