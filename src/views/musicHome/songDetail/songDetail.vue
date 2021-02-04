<template>
  <div class="singel" v-if="songId" ref="scroll">
    <div class="singel-main">
      <div class="singel-top">
        <div class="bck-img">
          <img
            :src="musicDetail.al.picUrl"
            alt
            style="width: 100%; filter: blur(80px); maxheight: 400px; border-radius: 50%"
          />
        </div>
        <div class="singel-play-img">
          <div class="play-bar" ref="playBar">
            <img src="@/assets/image/player_bar.png" />
          </div>
          <div
            class="play-disc"
            ref="playDisc"
            :style="{ animationPlayState: isPlaying ? 'running' : 'paused' }"
          >
            <img src="@/assets/image/disc.png" style="width: 350px; height: 350px" />
            <img
              style="
                position: absolute;
                top: 22%;
                left: 22%;
                width: 195px;
                height: 195px;
                border-radius: 50%;
              "
              :src="musicDetail.al.picUrl"
              alt
            />
          </div>
        </div>
        <div class="singer-text">
          <div class="singel-title">
            <span
              style="font-size: 25px; font-weight: 500; margin-right: 5%; color: #000"
              >{{ musicDetail.name || musicDetail.al.name }}</span
            >
            <span
              style="border: 1px solid red; font-size: 12px; color: red; padding: 1px 4px"
              >标准音质</span
            >
            <div style="margin: 19px 0; fontsize: 13px">
              <div
                style="
                  display: inline-block;
                  width: 140px;
                  color: #2559a4;
                  margin-right: 5%;
                  white-space: nowrap;
                  text-overflow: ellipsis;
                  overflow: hidden;
                  word-break: break-all;
                "
              >
                <span style="color: #000">专辑:</span
                >{{ musicDetail.alia[0] || musicDetail.al.name }}
              </div>
              <div
                style="
                  display: inline-block;
                  color: #2559a4;
                  width: 170px;
                  white-space: nowrap;
                  text-overflow: ellipsis;
                  overflow: hidden;
                  word-break: break-all;
                "
              >
                <span style="color: #000">歌手:</span
                ><span>{{ musicDetail.ar[0].name }}</span>
              </div>
            </div>
          </div>
          <div class="lyric">
            <!--歌词-->

            <div
              style="
                width: 350px;
                height: 350px;
                overflow: auto;
                margin-top: 25px;
                transition: scrollTop 0.3s;
              "
              ref="lyricScroll"
            >
              <ul ref="lyric" v-if="lrcObject.length > 1">
                <li
                  v-for="(item, index) in lrcObject"
                  :key="index"
                  :style="{ color: lyricIndex === index ? 'red' : 'black' }"
                  :ref="[lyricIndex === index ? 'lyricRef' : '']"
                >
                  {{ item.c }}
                </li>
              </ul>
              <div v-else>纯音乐，请您欣赏</div>
            </div>
          </div>
        </div>
        <div class="singel-back">
          <el-button
            @click="comBack"
            icon="el-icon-copy-document"
            size="small"
          ></el-button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapMutations, mapActions } from "vuex";
export default {
  name: "Singel",
  components: {},
  computed: {
    ...mapGetters([
      //当前播放歌曲url
      "musicUrl",
      //当前播放歌曲详情
      "musicDetail",
      //当前播放歌曲id
      "songId",
      //判断当前是否在播放
      "isPlaying",
      //判断播放顺序模式
      "playOrd",
      //当前播放列表
      "playList",
      //已经播放过的列表
      "hasPlayList",
      //可播放范围
      "slider",
      //播放范围
      "playDur",
      //当前进度条
      "nowDuration",
    ]),
  },
  watch: {
    //切换了歌曲时
    songId() {
      this.offsets = 0;
      this.timerId = 0;
      this.routeNum = 0;
      this.lyricIndex = 0;
      this.getSongLyric(this.songId);
      // this.getSongLyricComment(
      //   this.songId,
      //   this.limits,
      //   this.offsets
      // );
      // this.getSongSimi(this.getNowMusicMenu.id);
    },
    //歌曲播放状态
    isPlaying() {},
    //歌曲进度条变化
    nowDuration() {
      //对每次进来的进度条进行判断
      // 跟下一句台词时长是否匹配,如果匹配则当前高亮的索引值+1
      //使用循环找到最接近当前播放时间的歌词
      for (let i = 0; i < this.lrcObject.length; i++) {
        //这里使用小于符号判断是为了 保证回退音乐进度事件的效果实现性
        if (this.nowDuration <= parseFloat(this.lrcObject[i].t)) {
          if (this.lyricIndex === i - 1) {
            break;
          }
          //找到比当前时间点 大一点的后一位的歌词的索引值
          this.lyricIndex = i - 1;
          //动态绑定ref 根据距离顶部不同的位置来控制歌词滚动 (原生的滚动条动画效果未实现，需要的话可能需要换其他滚动条，eg:bater-scroll)
          //这里加入了一个效果就是滑下去查看歌词时，不会自动滑动 只有到了高亮显示在可视区才会滚动
          // 175 是可视区的一半 55是出现离可视区距离 相当于一行高度 都可微调

          if (this.$refs.lyricRef[0].offsetTop > 100) {
            this.$refs.lyricScroll.scrollTop = this.$refs.lyricRef[0].offsetTop - 100;
          } else if (this.$refs.lyricRef[0].offsetTop < -100) {
            this.$refs.lyricScroll.scrollTop = this.$refs.lyricRef[0].offsetTop + 100;
          }
          //如果当前是最后一句歌词 代表歌曲要放送结束了 将我们的lyricIndex(当前歌词索引值还原成0便于下一曲使用)
          if (this.lyricIndex === this.lrcObject.length - 1) {
            this.lyricIndex = 0;
          }
          break;
        }
      }
    },
  },
  data() {
    return {
      lyrics: "",
      lrcObject: [],
      lyricIndex: 0,
      lyricComment: [],
      limits: 20,
      offsets: 0,
      timerId: 0,
      routeNum: 0,
      simis: {},
    };
  },
  methods: {
    //获取相似单曲
    getSongSimi(id) {
      this.$http
        .get("song/detail", {
          params: {
            id: id,
          },
        })
        .then((res) => {
          console.log(res.data);
          // this.songsDetail = res.data;
        });
    },
    //唱片旋转
    routeDeg() {},
    //切换评论页码

    //获取单曲评论

    //收缩页面
    comBack() {
      this.$router.back();
    },
    //获取歌词
    getSongLyric(id) {
      this.$http
        .get("/lyric", {
          params: {
            id: id,
          },
        })
        .then((res) => {
          console.log(res.data);
          this.lyrics = res.data.lrc.lyric;
          this.createLrcObj(this.lyrics);
        });
    },
    //解析歌词
    createLrcObj(lrc) {
      var oLRC = {
        ms: [], //歌词数组{t:时间,c:歌词}
      };
      if (lrc.length == 0) return;
      var lrcs = lrc.split("\n"); //用回车拆分成数组 (每一句歌词都用换行隔开了)
      for (let i in lrcs) {
        //遍历歌词数组
        lrcs[i] = lrcs[i].replace(/(^\s*)|(\s*$)/g, ""); //去除前后空格
        var arr = lrcs[i].match(/\[(\d+:.+?)\]/g); //提取时间字段，可能有多个
        var start = 0;
        for (let k in arr) {
          start += arr[k].length; //计算歌词位置 长度叠加
        }
        var content = lrcs[i].substring(start); //获取歌词内容 相当于减去时间字符串的长度剩下的就是内容
        for (let k in arr) {
          var t = arr[k].substring(1, arr[k].length - 1); //取[]间的内容
          // var t = arr[k]
          var s = t.split(":"); //分离:前后文字 便于计算成毫秒数
          oLRC.ms.push({
            //对象{t:时间,c:歌词}加入ms数组
            // t: t,
            t: (parseFloat(s[0]) * 60 + parseFloat(s[1])).toFixed(3),
            c: content === "" ? "\n" : content,
          });
        }
      }
      oLRC.ms.sort(function (a, b) {
        //按时间顺序排序
        return a.t - b.t;
      });
      this.lrcObject = oLRC.ms;
    },
  },
  created() {
    this.getSongLyric(this.songId);
    // this.getSongLyricComment(this.getNowMusicMenu.id);
    // this.getSongSimi(this.getNowMusicMenu.id);
    //唱片滚动
  },
};
</script>

<style scoped>
.singer-left {
  width: 65%;
}
.singer-right {
  width: 30%;
  margin-left: 20px;
}
::-webkit-scrollbar {
  width: 8px;
}
::-webkit-scrollbar-thumb {
  background-color: #cecdd3;
  border-radius: 3px;
}
li {
  margin-top: 15px;
  list-style: none;
}
.singel-back {
  position: absolute;
  top: 0;
  right: 0;
}
.bck-img {
  position: absolute;
  width: 70%;
  top: 0;
  left: 50%;
  transform: translateX(-50%);
  z-index: 0;
}
.lyric {
  position: relative;
  z-index: 199;
  /* overflow: auto;
  max-height: 320px;
  width: 400px;
  border: 1px solid red; */
}
.singer-text {
  width: 50%;
  margin-left: 15%;
}
.singel {
  position: fixed;
  width: 100%;
  height: 100vh;
  padding-top: 20px;
  margin-top: -20px;
  overflow-y: overlay;
}
.singel-main {
  margin-left: 8%;
  margin-top: 2%;
  width: 70%;
}
.singel-top {
  display: flex;
  position: relative;
}
.singel-play-img {
  margin-left: 35px;
  position: relative;
}
@-webkit-keyframes record {
  from {
    -webkit-transform: rotate(0deg);
  }
  to {
    -webkit-transform: rotate(360deg);
  }
}

@keyframes record {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
}
.play-bar {
  position: absolute;
  top: 0px;
  left: 60%;
  z-index: 10;
}
.play-disc {
  margin-top: 50px;
  animation-name: record;
  animation-duration: 20s;
  animation-iteration-count: infinite;
  animation-timing-function: linear;
}
</style>
