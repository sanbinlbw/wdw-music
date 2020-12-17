<template>
  <div class="findMusic">
    <div id="headTab">
      <!-- 头部导航栏 -->
      <headTab />
    </div>
    <div>
      <!-- 二级路由 -->
      <router-view id="secondRoute" @setMusicUrl="setMusicUrl" />
    </div>
  </div>
</template>

<script>
import headTab from "@/components/musicHome/findMusic/headTab/headTab";
export default {
  name: "findMusic",
  components: {
    headTab,
  },
  data() {
    return {};
  },
  methods: {
    setMusicUrl(url, detail) {
      this.$emit("setMusicUrl", url, detail);
    },
  },
};
</script>

<style scoped>
#headTab {
  /* width: 100%; */
  widows: 450px;
  height: 70px;
  margin-left: 50%;
  transform: translateX(-50%);
}

#secondRoute:hover {
  overflow-y: overlay;
}

#secondRoute {
  padding-right: 17px;
  padding-left: 3px;
  height: 100vh;
  width: 100%;
  overflow-y: hidden;
  overflow-x: hidden;
}
</style>
