<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: "App",
  components: {},
  data() {
    return {};
  },
};
</script>

<style>
body {
  overflow-y: hidden;
}
/*修改滚动条样式*/

div::-webkit-scrollbar {
  width: 10px;
  height: 10px;
  /**/
}

div::-webkit-scrollbar-track {
  /* background: rgb(239, 239, 239); */
  border-radius: 2px;
}

div::-webkit-scrollbar-thumb {
  background: rgb(191, 191, 191);
  border-radius: 10px;
}

div::-webkit-scrollbar-thumb:hover {
  background: rgb(173, 171, 171);
}

div::-webkit-scrollbar-corner {
  background: #179a16;
}
</style>