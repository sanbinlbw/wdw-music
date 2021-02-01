<template>
  <div class="searchByPlayList">
    <div class="noSearch" v-if="songAll.albumCount === 0">
      很抱歉，没有找到您搜索信息的任何相关专辑。
    </div>
    <div v-else>
      <div
        :class="{ songMesSin: index % 2 !== 0, songMesDou: index % 2 === 0 }"
        v-for="(item, index) in songAll.albumList"
        :key="index"
        background="#f9f9f9"
        @click="toAlbumPage(item.id)"
      >
        <!-- 专辑封面 -->
        <el-image
          :src="item.picUrl"
          fit="fill"
          style="width: 150px; height: 150px; border-radius: 8px"
        ></el-image>
        <!-- 专辑名 -->
        <span class="albumName">{{ item.name }}</span>
        <!-- 专辑作者名 -->
        <span class="albumArtist">{{ item.artist.name }}</span>
        <!-- 专辑图标 -->
        <img
          src="@/assets/image/album.svg"
          alt=""
          style="
            position: absolute;
            right: 10%;
            top: 50%;
            transform: translateY(-50%);
            border-radius: 40px;
          "
        />
      </div>
      <div class="page">
        <pagination
          :count="songAll.albumCount"
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
  name: "searchByAlbum",
  components: { pagination },
  props: {
    // 歌曲搜索信息
    songAll: Object,
  },
  data() {
    return {};
  },
  methods: {
    //获取指定页数专辑
    getSongPage(offset, type) {
      this.$emit("getSongPage", offset, type);
    },
    //点击专辑跳转界面
    toAlbumPage(id) {
      this.$router.push("/musicHome/albumPage/" + id);
    },
  },
  created() {
    this.getSongPage(0, "Album");
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
}
/* 专辑作者名 */
.albumArtist {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  left: 50%;
  font-size: 15px;
  font-weight: 100;
}
</style>
