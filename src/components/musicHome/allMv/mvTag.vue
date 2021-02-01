<template>
  <div class="mvTag">
    <!-- 语种标签 -->
    <div class="languages">
      <div class="kind">地区:</div>
      <div class="tags">
        <span
          v-for="(item, index) in languageTags"
          :key="index"
          :class="{ actTag: item === languageTag }"
          @click="saveLangTag(item)"
          style="cursor: pointer; text-align: center; display: block"
        >
          {{ item }}
        </span>
      </div>
    </div>
    <!-- 类别标签 -->
    <div class="languages">
      <div class="kind">类型:</div>
      <div class="tags">
        <span
          v-for="(item, index) in genderTags"
          :key="index"
          :class="{ actTag: item === genderTag }"
          @click="saveGenTag(item)"
          style="cursor: pointer; text-align: center; display: block"
        >
          {{ item }}
        </span>
      </div>
    </div>
    <!-- 字母标签 -->
    <div class="languages">
      <div class="kind">排序:</div>
      <div class="tags">
        <span
          v-for="(item, index) in firTags"
          :key="index"
          :class="{ actTag: item === firTag }"
          @click="saveFirTag(item)"
          style="cursor: pointer; text-align: center; display: block"
        >
          {{ item }}
        </span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "mvTag",
  components: {},
  props: {
    // 当前选中标签
    languageTag: String,
    genderTag: String,
    firTag: String,
  },
  data() {
    return {
      // 语言标签
      languageTags: ["全部", "内地", "港台", "欧美", "韩国", "日本"],
      // 类别标签
      genderTags: ["全部", "官方版", "原声", "现场版", "网易出品"],
      // 排序标签
      firTags: ["上升最快", "最热", "最新"],
    };
  },
  methods: {
    // 选中语言标签
    saveLangTag(tag) {
      if (this.languageTag != tag) {
        this.$emit("getMvList", tag, this.genderTag, this.firTag, 0);
        this.$emit("backNumOne");
      }
    },
    // 选中类型标签
    saveGenTag(tag) {
      if (this.genderTag != tag) {
        this.$emit("getMvList", this.languageTag, tag, this.firTag, 0);
        this.$emit("backNumOne");
      }
    },
    // 选中首字母标签
    saveFirTag(tag) {
      if (this.firTag != tag) {
        this.$emit("getMvList", this.languageTag, this.genderTag, tag, 0);
        this.$emit("backNumOne");
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
