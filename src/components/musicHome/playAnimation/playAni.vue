<template>
<!-- 音乐播放时的动画表情 -->
  <div class="playAni">
    <div class="waveFir"></div>
    <div class="waveSec"></div>
    <div class="waveTrd"></div>
  </div>
</template>

<script>
export default {
  name: "playAni",
  components: {},
  data() {
    return {};
  },
};
</script>

<style scoped>
.playAni {
  height: 12px;
  width: 12px;
  overflow: hidden;
  transform: rotate(180deg);
}
.waveFir {
  float: left;
  width: 3px;
  height: 1px;
  background: #ec4141;
  margin-right: 1px;
  animation-name: Fri;
  animation-duration: 0.7s;
  animation-iteration-count: infinite;
  animation-direction: alternate-reverse;
}

.waveSec {
  float: left;
  width: 3px;
  height: 1px;
  background: #ec4141;
  margin-right: 1px;
  animation-name: Sec;
  animation-duration: 0.5s;
  animation-iteration-count: infinite;
  animation-direction: alternate-reverse;
}

.waveTrd {
  float: left;
  width: 3px;
  height: 1px;
  background: #ec4141;
  animation-name: Trd;
  animation-duration: 0.6s;
  animation-iteration-count: infinite;
  animation-direction: alternate-reverse;
}

@keyframes Fri {
  to {
    height: 8px;
  }
}

@keyframes Sec {
  to {
    height: 11px;
  }
}

@keyframes Trd {
  to {
    height: 12px;
  }
}
</style>
