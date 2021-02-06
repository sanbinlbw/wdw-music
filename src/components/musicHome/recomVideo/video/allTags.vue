<template>
  <div class="allTags">
    <div class="label">
      <div v-for="(item, index) in allTags" :key="index">
        <div style="font-size: 14px">
          <span
            @click="changeTag(item)"
            :class="{ actTag: tagKind === item.name }"
            style="cursor: pointer"
            >{{ item.name }}</span
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
    allTags: Array,
  },
  components: {},
  data() {
    return {};
  },
  methods: {
    changeTag(item) {
      this.$emit("selectTag", item);
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

.actTag {
  margin-left: -15px;
  padding: 5px 20px;
  color: #d03535;
  border-radius: 20px;
  background: #fcf4f4;
}
.label {
  display: grid;
  grid-template-columns: repeat(6, 1fr);
  row-gap: 10px;
  line-height: 40px;
  text-align: center;
}
</style>
