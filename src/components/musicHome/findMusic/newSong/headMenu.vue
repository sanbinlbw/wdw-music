<template>
  <div class="headMenu">
    <div
      :class="{ selTableTitle: isNewSongList, noTableTitle: !isNewSongList }"
      @click="$emit('changeModel', true)"
    >
      新歌速递
    </div>
    <div
      :class="{ selTableTitled: !isNewSongList, noTableTitled: isNewSongList }"
      @click="$emit('changeModel', false)"
    >
      新碟上架
    </div>
  </div>
</template>

<script>
export default {
  name: "headMenu",
  components: {},
  props: {
    //当前播放是否显示
    isNewSongList: Boolean,
  },
  data() {
    return {};
  },
};
</script>

<style scoped>
.headMenu {
  position: relative;
  width: 400px;
  background: #ffffff;
  overflow-y: overlay;
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
}
/* 选取时的样式 */
.noTableTitle {
  width: 40%;
  height: 30px;
  line-height: 30px;
  border: 1px solid #bbbbbb;
  border-radius: 35px;
  color: #000000;
  margin-top: 15px;
  margin-bottom: 15px;
  margin-left: 35%;
  transform: translateX(-50%);
  text-align: center;
  font-size: 13px;
}

.selTableTitle {
  width: 40%;
  height: 30px;
  line-height: 30px;
  border: 1px solid #bbbbbb;
  border-radius: 35px;
  background: #bbbbbb;
  color: #ffffff;
  margin-top: 15px;
  margin-bottom: 15px;
  margin-left: 35%;
  transform: translateX(-50%);
  text-align: center;
  font-size: 13px;
}

.noTableTitled {
  position: absolute;
  top: 15px;
  right: 35%;
  transform: translateX(50%);
  width: 40%;
  height: 30px;
  line-height: 30px;
  border: 1px solid #bbbbbb;
  border-radius: 35px;
  color: #000000;
  text-align: center;
  font-size: 13px;
}

.selTableTitled {
  position: absolute;
  top: 15px;
  right: 35%;
  transform: translateX(50%);
  width: 40%;
  height: 30px;
  line-height: 30px;
  border: 1px solid #bbbbbb;
  border-radius: 35px;
  background: #bbbbbb;
  color: #ffffff;
  text-align: center;
  font-size: 13px;
}
</style>
