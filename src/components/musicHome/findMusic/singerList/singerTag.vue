<template>
  <div class="singerTag">
    <!-- 语种标签 -->
    <div class="languages">
      <div class="kind">语种:</div>
      <div class="tags">
        <span
          v-for="(item, index) in languageTags"
          :key="index"
          :class="{ actTag: languageIndex === index }"
          @click="saveLangTag(item[1], index)"
          style="cursor: pointer; text-align: center; display: block"
        >
          {{ item[0] }}
        </span>
      </div>
    </div>
    <!-- 类别标签 -->
    <div class="languages">
      <div class="kind">分类:</div>
      <div class="tags">
        <span
          v-for="(item, index) in genderTags"
          :key="index"
          :class="{ actTag: genderIndex === index }"
          @click="saveGenTag(item[1], index)"
          style="cursor: pointer; text-align: center; display: block"
        >
          {{ item[0] }}
        </span>
      </div>
    </div>
    <!-- 字母标签 -->
    <div class="languages">
      <div class="kind">筛选:</div>
      <div class="tags">
        <span
          v-for="(item, index) in firTags"
          :key="index"
          :class="{ actTag: firIndex === index }"
          @click="saveFirTag(item[1], index)"
          style="cursor: pointer; text-align: center; display: block"
        >
          {{ item[0] }}
        </span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "singerTag",
  components: {},
  data() {
    return {
      // 当前选中标签
      languageTag: -1,
      genderTag: -1,
      firTag: -1,
      // 判断是否选中
      languageIndex: 0,
      genderIndex: 0,
      firIndex: 0,
      // 语言标签
      languageTags: [
        ["全部", -1],
        ["华语", 7],
        ["欧美", 96],
        ["日本", 8],
        ["韩国", 16],
        ["其他", 0],
      ],
      // 类别标签
      genderTags: [
        ["全部", -1],
        ["男歌手", 1],
        ["女歌手", 2],
        ["乐队", 3],
      ],
      // 字母标签
      firTags: [
        ["热门", -1],
        ["A", "a"],
        ["B", "b"],
        ["C", "c"],
        ["D", "d"],
        ["E", "e"],
        ["F", "f"],
        ["G", "g"],
        ["H", "h"],
        ["I", "i"],
        ["J", "j"],
        ["K", "k"],
        ["L", "l"],
        ["M", "m"],
        ["N", "n"],
        ["O", "o"],
        ["P", "p"],
        ["Q", "q"],
        ["R", "r"],
        ["S", "s"],
        ["T", "t"],
        ["U", "u"],
        ["V", "v"],
        ["W", "w"],
        ["X", "x"],
        ["Y", "y"],
        ["Z", "z"],
        ["#", 0],
      ],
    };
  },
  methods: {
    // 选中语言标签
    saveLangTag(tag, index) {
      this.$emit("cleanSingerInfo");
      if (this.languageIndex != index) {
        this.languageTag = tag;
        this.languageIndex = index;
        this.$emit("getSingerInfo", this.genderTag, this.languageTag, this.firTag, 0);
      } 
    },
    // 选中类型标签
    saveGenTag(tag, index) {
      this.$emit("cleanSingerInfo");
      if (this.genderIndex != index) {
        this.genderTag = tag;
        this.genderIndex = index;
        this.$emit("getSingerInfo", this.genderTag, this.languageTag, this.firTag, 0);
      } 
    },
    // 选中首字母标签
    saveFirTag(tag, index) {
      this.$emit("cleanSingerInfo");
      if (this.firIndex != index) {
        this.firTag = tag;
        this.firIndex = index;
        this.$emit("getSingerInfo", this.genderTag, this.languageTag, this.firTag, 0);
      } 
    },
  },
};
</script>

<style scoped>
/* 选中标签 */
.actTag {
  color: #d03535;
  border-radius: 20px;
  background: #fcf4f4;
}
/* 标签样式 */
.languages {
  display: grid;
  grid-template-columns: repeat(13, 1fr);
  width: 90%;

  margin-bottom: 20px;
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
}
.kind {
  height: 100%;
  text-align: center;
  line-height: 30px;
  grid-column: 1/2;
  float: left;
}
.tags {
  display: grid;
  grid-template-columns: repeat(11, 1fr);
  line-height: 30px;
  grid-column: 2/14;
}
</style>
