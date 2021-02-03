<template>
  <div class="searchBySinger">
    <div class="noSearch" v-if="songAll.singerCount === 0">
      很抱歉，没有找到您搜索信息的任何相关歌手。
    </div>
    <div v-else>
      <div
        :class="{ songMesSin: index % 2 !== 0, songMesDou: index % 2 === 0 }"
        v-for="(item, index) in songAll.singerList"
        :key="index"
        background="#f9f9f9"
        @click="toArtistPage(item.id)"
      >
        <!-- 歌手封面 -->
        <el-image
          :src="item.picUrl"
          fit="fill"
          style="width: 150px; height: 150px; border-radius: 8px"
        ></el-image>
        <!-- 歌手名 -->
        <span class="singerName">{{ item.name }}</span>
        <!-- 歌手图标 -->
        <img
          v-show="item.accountId"
          src="@/assets/image/singer.svg"
          alt=""
          style="
            position: absolute;
            right: 10%;
            top: 50%;
            transform: translateY(-50%);
            background: #ef4542;
            border-radius: 40px;
          "
        />
      </div>
      <div class="page">
        <pagination
          :count="songAll.singerCount"
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
  name: "searchBySinger",
  components: {
    pagination,
  },
  props: {
    // 歌曲搜索信息
    songAll: Object,
  },
  data() {
    return {};
  },
  methods: {
    //获取指定页数歌手
    getSongPage(offset, type) {
      this.$emit("getSongPage", offset, type);
    },
    //点击歌手跳转界面
    toArtistPage(id) {
      this.$router.push("/musicHome/artistPage/" + id);
    },
  },
  created() {
    this.getSongPage(0, "Singer");
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
/* 歌手名 */
.singerName {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  margin-left: 30px;
  font-weight: 400;
}
</style>
