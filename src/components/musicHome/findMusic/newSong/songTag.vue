<template>
  <div class="songTag">
    <div class="tags">
      <span
        v-for="(item, index) in tags"
        :key="index"
        :class="{ actTag: tagIndex === index }"
        @click="getNewSong(item[1], index)"
        style="cursor: pointer; text-align: center; display: block"
      >
        {{ item[0] }}
      </span>
    </div>
  </div>
</template>

<script>
export default {
  name: "songTag",
  components: {},
  data() {
    return {
      // 标签
      tags: [
        ["全部", 0],
        ["华语", 7],
        ["欧美", 96],
        ["韩国", 16],
        ["日本", 8],
      ],
      // 判断是否选中
      tagIndex: 0,
    };
  },
  methods: {
    // 根据标签获取歌曲数据
    getNewSong(type, index) {
      if (this.tagIndex !== index) {
        this.tagIndex = index;
        this.$emit("getNewSong", type);
      }
    },
  },
};
</script>

<style scoped>
/* 标签样式 */
.tags {
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  line-height: 30px;
  grid-column: 2/14;
  color: rgba(0, 0, 0, 0.5);
}
/* 选中标签 */
.actTag {
  color: #000;
  font-weight: 800;
}
</style>
