<template>
  <div class="searchPage">
    <div id="headTab">
      <!-- 头部导航栏 -->
      <searchHeadTab />
    </div>
    <div>
      <!-- 子路由 -->
      <router-view id="secondRoute" />
    </div>
  </div>
</template>

<script>
import searchHeadTab from "@/components/musicHome/searchPage/searchHeadTab";
export default {
  name: "searchPage",
  components: {
    searchHeadTab,
  },
  data() {
    return {};
  },
};
</script>

<style scoped>
#headTab {
  /* width: 100%; */
  widows: 450px;
  height: 70px;
  margin-left: 55%;
  transform: translateX(-50%);
}
/* 子路由样式 */
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
