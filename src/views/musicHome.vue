<template>
  <div class="musicHome">
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
        <div id="searchDiv">
          <el-input
            style="opacity: 0.5"
            placeholder="请输入歌曲名或歌手名"
            size="mini"
          />
          <i class="elsearch el-icon-search" @click="search"></i>
        </div>
        <loginBar style="position: absolute; right: 5%" />
      </el-header>
      <el-container>
        <!-- 左部导航栏 -->
        <el-aside width="16%"><leftNav /></el-aside>
        <!-- 展示路由 -->
        <el-main><router-view @setMusicUrl="setMusicUrl" /></el-main>
      </el-container>
    </el-container>
    <!-- 播放器 -->
    <musicPlay
      :musicUrl="musicUrl"
      :musicDetail="musicDetail"
      ref="musicPlay"
      @getBackSong="getBackSong"
      @getNextSong="getNextSong"
      @isShowSongList="isShowSongList"
      @startPlaying="startPlaying"
      @pausePlaying="pausePlaying"
    />
    <!-- 播放列表弹出层 -->
    <songTable
      ref="songTable"
      v-show="showSongList"
      :hisMusicList="hisMusicList"
      :playList="playList"
      :songId="songId"
      @playListSong="playListSong"
      @cleanList="cleanList"
    />
  </div>
</template>

<script>
import leftNav from "@/components/musicHome/leftNav/leftNav";
import loginBar from "@/components/musicHome/leftNav/loginBar";
import musicPlay from "@/components/musicHome/musicPlay/musicPlay";
import songTable from "@/components/musicHome/musicPlay/songTable";
export default {
  name: "musicHome",
  components: {
    leftNav,
    loginBar,
    musicPlay,
    songTable,
  },
  data() {
    return {
      //当前播放歌曲url
      musicUrl: "",
      //当前播放歌曲详情
      musicDetail: {
        al: {
          name: "",
          picUrl: "",
        },
        ar: [""],
        alia: {
          name: "",
        },
        name: "",
      },
      //当前歌曲id
      songId: "",
      //上一首歌曲id
      backSongId: "",
      //当前歌单
      playList: [],
      //历史歌曲播放列表
      hisMusicList: [],
      //播放过的歌曲歌单(避免上一首或者随机播放播放到重复的歌曲)
      hasPlayList: [],
      //是否显示歌单
      showSongList: false,
    };
  },
  methods: {
    search() {
      console.log("search");
    },
    //接受子组件传来的歌曲信息
    setMusicUrl(url, detail) {
      //接受子组件传来的数据
      this.musicUrl = url;
      this.musicDetail = detail;
      this.songId = detail.id;
      this.$refs.musicPlay.isPlaying = true;
      //放入历史播放
      this.deleteSong(this.hisMusicList, detail.id);
      this.hisMusicList.unshift(detail);
      //加入播放过的歌单
      this.deleteSong(this.hasPlayList, detail.id);
      this.hasPlayList.push(detail);
      //将播放的音乐id放入歌单
      for (let song of this.playList) {
        if (song.id === detail.id) {
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
      this.playList.unshift(detail);
    },
    // 播放歌单里面的歌曲
    playListSong(musicId) {
      //接受子组件传来的数据
      this.$refs.musicPlay.isPlaying = true;
      this.$refs.songTable.isPlaying = true;
      this.getMusicDetail(musicId).then(() => {
        //放入历史播放
        this.deleteSong(this.hisMusicList, musicId);
        this.hisMusicList.unshift(this.musicDetail);
        //重置播放过的歌单
        this.hasPlayList = [...this.playList];
      });
      this.getMusicUrl(musicId);
      this.songId = musicId;
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
    //是否展示歌单
    isShowSongList() {
      this.showSongList = !this.showSongList;
    },
    //清空当前歌单
    cleanList() {
      //当前播放列表
      this.playList = [];
      //历史播放列表
      this.hisMusicList = [];
      //当前播放音乐url
      this.musicUrl = "";
      //当前播放歌曲详情
      this.musicDetail = {
        al: {
          name: "",
          picUrl: "",
        },
        ar: [""],
        alia: {
          name: "",
        },
        name: "",
      };
    },
    //调用子组件方法改变当前的播放状态
    startPlaying() {
      this.$refs.songTable.isPlaying = true;
    },
    pausePlaying() {
      this.$refs.songTable.isPlaying = false;
    },
    //获取下一首歌曲
    getNextSong(playOrd) {
      switch (playOrd) {
        case 0:
          this.ordPlay();
          break;
        case 1:
          this.cirPlay();
          break;
        case 2:
          this.$refs.musicPlay.rePlaySong();
          break;
        case 3:
          this.randomPlay();
          break;
      }
    },
    //获取上一首歌曲
    getBackSong(playOrd) {
      switch (playOrd) {
        case 0:
          this.reOrdPlay();
          break;
        case 1:
          this.reCirPlay();
          break;
        case 2:
          this.reCirPlay();
          break;
        case 3:
          this.randomPlay();
          break;
      }
    },
    //删除歌曲(需要在哪个列表中删除和删除歌曲的id)
    deleteSong(list, songId) {
      for (let song of list) {
        if (song.id === songId) {
          let index = list.indexOf(song);
          if (index !== -1) {
            list.splice(index, 1);
            break;
          }
        }
      }
    },
    //顺序播放
    ordPlay() {
      let index = 0;
      for (let i = 0; i < this.playList.length; i++) {
        if (this.songId === this.playList[i].id) {
          index = i;
          break;
        }
      }
      if (index === this.playList.length - 1) {
        const h = this.$createElement;
        this.$message.error({
          message: h("p", null, [
            h("span", null, "已经是列表最后一首歌曲"),
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
      this.playListSong(this.playList[index + 1].id);
    },
    //顺序播放的上一首歌曲
    reOrdPlay() {
      let index = 0;
      for (let i = 0; i < this.playList.length; i++) {
        if (this.songId === this.playList[i].id) {
          index = i;
          break;
        }
      }
      if (index === 0) {
        const h = this.$createElement;
        this.$message.error({
          message: h("p", null, [
            h("span", null, "已经是列表第一首歌曲"),
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
      this.playListSong(this.playList[index - 1].id);
    },
    // 列表循环
    cirPlay() {
      let index = 0;
      for (let i = 0; i < this.playList.length; i++) {
        if (this.songId === this.playList[i].id) {
          index = i;
          break;
        }
      }
      if (index === this.playList.length - 1) {
        this.playListSong(this.playList[0].id);
        return;
      }
      this.playListSong(this.playList[index + 1].id);
    },
    //列表循环的上一首歌曲
    reCirPlay() {
      let index = 0;
      for (let i = 0; i < this.playList.length; i++) {
        if (this.songId === this.playList[i].id) {
          index = i;
          break;
        }
      }
      if (index === 0) {
        this.playListSong(this.playList[this.playList.length - 1].id);
        return;
      }
      this.playListSong(this.playList[index - 1].id);
    },
    //随机播放
    randomPlay() {
      //接受子组件传来的数据
      if (this.hasPlayList.length === 0) {
        this.hasPlayList = [...this.playList];
      }
      this.deleteSong(this.hasPlayList, this.songId);
      const index = this.getRandom(0, this.hasPlayList.length - 1);
      this.$refs.musicPlay.isPlaying = true;
      this.$refs.songTable.isPlaying = true;
      this.getMusicDetail(this.hasPlayList[index].id).then(() => {
        //放入历史播放
        this.deleteSong(this.hisMusicList, this.hasPlayList[index].id);
        this.hisMusicList.unshift(this.musicDetail);
        //删除避免重复播放
        this.deleteSong(this.hasPlayList, this.hasPlayList[index].id);
      });
      this.getMusicUrl(this.hasPlayList[index].id);
      this.songId = this.hasPlayList[index].id;
    },
    //随机数
    getRandom(min, max) {
      return Math.floor(Math.random() * (max - min + 1) + min);
    },
  },
  created() {},
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
</style>