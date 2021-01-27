<template>
  <!-- 三行情诗彩蛋 -->
  <div class="loveLetter">
    <div class="fri">不说爱你</div>
    <div class="sec">爱意这么盛大</div>
    <div class="trd">简单的两三个字又如何装得下</div>
    <div class="creator">--爱你的我</div>
  </div>
</template>

<script>
export default {
  name: "loveLetter",
  components: {},
  data() {
    return {};
  },
  methods: {},
};
</script>

<style scoped>
.loveLetter {
  position: relative;
  /* box-shadow: gray 0px 0px 2px 2px; */
  padding: 40px;
  height: 550px;
  width: 550px;
  font-size: 60px;
  font-family: STFangsong;
  border-radius: 10px;
  /* background: rgba(237, 145, 186, 0.8); */
}

.fri {
  opacity: 0;
  margin-bottom: 70px;
  animation-name: Fri;
  animation-duration: 4s;
  animation-fill-mode: forwards;
}

@keyframes Fri {
  to {
    opacity: 1;
  }
}

.sec {
  opacity: 0;
  margin-bottom: 70px;
  animation-name: Sec;
  animation-duration: 8s;
  animation-fill-mode: forwards;
}

@keyframes Sec {
  33% {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}

.trd {
  opacity: 0;
  margin-bottom: 70px;
  animation-name: Tri;
  animation-duration: 12s;
  animation-fill-mode: forwards;
}

@keyframes Tri {
  43% {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}

.creator {
  position: absolute;
  bottom: 80px;
  right: 10px;
  opacity: 0;
  animation-name: creator;
  animation-duration: 16s;
  animation-fill-mode: forwards;
}

@keyframes creator {
  50% {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}
</style>
