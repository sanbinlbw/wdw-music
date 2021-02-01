<template>
  <div class="videoPage">
    <video width="50%" height="50%" controls :src="videoUrl"></video>
  </div>
</template>

<script>
export default {
  name: "videoPage",
  components: {},
  data() {
    return {
      videoId: this.$route.params.id,
      videoUrl: "",
    };
  },
  methods: {
    //获取当前的mv详细数据
    getMvDetail() {
      this.$http.get("mv/detail", { params: { mvid: this.videoId } }).then((res) => {
        console.log(res.data);
        // this.videoDetailInfo = res.data
      });
    },
    //获取mv的url
    getMvUrl() {
      this.$http.get("mv/url", { params: { id: this.videoId } }).then((res) => {
        this.videoUrl = res.data.data.url;
        console.log(res.data);
      });
    },
    //获取当前的视频详细数据
    getVideoDetail() {
      this.$http.get("video/detail", { params: { id: this.videoId } }).then((res) => {
        console.log(res.data);
        // this.videoDetailInfo = res.data
      });
    },
    //获取视频的url
    getVideoUrl() {
      this.$http.get("video/url", { params: { id: this.videoId } }).then((res) => {
        this.videoUrl = res.data.urls[0].url;
        console.log(res.data);
      });
    },
    //获取当前mv的评论数据
    // getCommentList() {
    //     this.$http.get('/comment/video', {params: this.queryInfo}).then(res => {
    //         this.videoCommentList = res.data.comments
    //         this.commentTotal = res.data.total
    //         this.videoHotComment = res.data.hotComments
    //     })
    // },
  },
  created() {
    if (isNaN(this.videoId)) {
      this.getVideoDetail();
      this.getVideoUrl();
    } else {
      this.getMvDetail();
      this.getMvUrl();
    }
  },
};
</script>

<style scoped></style>
