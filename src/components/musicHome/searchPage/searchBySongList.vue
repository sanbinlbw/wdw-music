<template>
  <div class="searchBySongList">
    <div class="noSearch" v-if="songAll.songListCount === 0">
      很抱歉，没有找到您搜索信息的任何相关歌单。
    </div>
    <div v-else>
      <div
        :class="{ songMesSin: index % 2 !== 0, songMesDou: index % 2 === 0 }"
        v-for="(item, index) in songAll.songList"
        :key="index"
        @click="toSongListPage(item.id)"
        background="#f9f9f9"
      >
        <!-- 歌单封面 -->
        <el-image
          :src="item.coverImgUrl"
          fit="fill"
          style="width: 150px; height: 150px; border-radius: 8px"
        ></el-image>
        <!-- 专辑名 -->
        <span class="albumName">{{ item.name }}</span>
        <!-- 专辑作者名 -->
        <span class="albumArtist">{{ item.trackCount }}首</span>
        <!-- 专辑图标 -->
        <span
          alt=""
          style="
            position: absolute;
            left: 70%;
            top: 50%;
            transform: translateY(-50%);
            border-radius: 40px;
          "
        >
          <span style="opacity: 0.4">by </span>{{ item.creator.nickname }}
        </span>
      </div>
      <div class="page">
        <pagination
          :count="songAll.songListCount"
          :pageNum="20"
          @getSongPage="getSongPage"
        />
      </div>
      <br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br />
    </div>
  </div>
</template>

<script>
import pagination from "./pagination";
export default {
  name: "searchBySongList",
  components: { pagination },
  props: {
    // 歌曲搜索信息
    songAll: Object,
  },
  data() {
    return {};
  },
  methods: {
    //获取指定页数歌单
    getSongPage(offset, type) {
      this.$emit("getSongPage", offset, type);
    },
    //点击歌单跳转界面
    toSongListPage(id) {
      this.$router.push("/musicHome/songList/" + id);
    },
  },
  created() {
    this.getSongPage(0, "SongList");
  },
};
</script>

<style scoped>
/* 当搜索不到时页面展示 */
.noSearch {
  display: grid;
  align-content: center;
  justify-content: center;
  width: 70vw;
  height: 60vh;
}
/* 每行歌曲样式 */

.songMesSin {
  position: relative;
  width: 100%;
  height: 150px;
  line-height: 150px;
  padding: 15px;
  /* opacity: 0.8; */
  cursor: pointer;
}

.songMesDou {
  position: relative;
  width: 100%;
  height: 150px;
  line-height: 150px;
  padding: 15px;
  /* opacity: 0.8; */
  background: #f9f9f9;
  cursor: pointer;
}

.songMesSin:hover,
.songMesDou:hover {
  background: #f4f4f4;
}
/* 专辑名 */
.albumName {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  margin-left: 40px;
  font-weight: 400;
  color: #507daf;
}
/* 专辑作者名 */
.albumArtist {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  left: 50%;
  font-size: 15px;
  font-weight: 100;
  opacity: 0.5;
}
</style>
