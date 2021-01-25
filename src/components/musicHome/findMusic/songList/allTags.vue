<template>
  <div class="allTags">
    <div
      style="width: 70px"
      :class="{ actHotTag: tagKind === '全部歌单', hotTag: tagKind !== '全部歌单' }"
      @click="changeTag('全部歌单')"
    >
      全部歌单
    </div>
    <el-divider></el-divider>
    <div class="languages" v-for="(item, index) in allTags.sub" :key="index">
      <div class="kind">
        <i :class="allTags.icon[index]" style="font-size: 30px"></i>
        {{ allTags.categories[index] }}
      </div>
      <div class="label">
        <div v-for="(tag, index) in item" :key="index">
          <span
            style="cursor: pointer; font-size: 14px"
            @click="changeTag(tag.name)"
            :class="{ actTag: tagKind === tag.name }"
            >{{ tag.name }}</span
          >
          <span style="font-weight: 10; font-size: 1px; color: #d03535" v-show="tag.hot"
            >HOT</span
          >
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "allTags",
  props: {
    // 当前标签
    tagKind: String,
    // 所有标签信息
    allTags: Object,
  },
  components: {},
  data() {
    return {};
  },
  methods: {
    changeTag(tag) {
      this.$emit("selectTag", tag);
    },
  },
};
</script>

<style scoped>
.allTags {
  position: absolute;
  top: -1%;
  width: 70%;
  z-index: 100;
  background: #ffffff;
  padding-top: 20px;
  border-radius: 10px;
  box-shadow: rgba(0, 0, 0, 0.1) 0px 0px 2px 2px;
}
/* 未选中标签 */
.hotTag {
  margin-left: 30px;
  padding: 5px 15px;
  line-height: 30px;
  cursor: pointer;
}
.hotTag:hover {
  color: #d03535;
}
/* 标签被选中时 */
.actHotTag {
  line-height: 30px;
  color: #d03535;
  margin-left: 30px;
  padding: 5px 15px;
  border-radius: 20px;
  cursor: pointer;
  background: #fcf4f4;
}
.actTag {
  padding: 5px 15px;
  margin-left: -15px;
  color: #d03535;
  border-radius: 20px;
  background: #fcf4f4;
}
/* 标签样式 */
.languages {
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  width: 95%;
  padding-left: 20px;
  margin-bottom: 20px;
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
}
.kind {
  height: 100%;
  grid-column: 1/2;
  opacity: 0.4;
  float: left;
}
.label {
  display: grid;
  grid-template-columns: repeat(6, 1fr);
  line-height: 40px;
  grid-column: 2/8;
}
</style>
