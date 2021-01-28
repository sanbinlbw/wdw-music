<template>
  <div class="loveHeart"></div>
</template>

<script>
export default {
  name: "loveHeart",
  components: {},
  props: {
    // 心动模式是否打开
    loveModel: Boolean,
  },
  data() {
    return {};
  },
  methods: {},
  created() {
    document.addEventListener("mousemove", (e) => {
      if (!this.loveModel) {
        return;
      }
      let body = document.querySelector("body");
      let heart = document.createElement("span");
      let x = e.pageX;
      let y = e.pageY;
      heart.style.left = x + "px";
      heart.style.top = y + "px";
      heart.className = "heart";
      let size = Math.ceil(Math.random() * 100);
      heart.style.width = size + "px";
      heart.style.height = size + "px";
      setTimeout(() => {
        heart.remove();
      }, 2000);
      body.appendChild(heart);
    });
  },
};
</script>

<style>
.heart {
  position: absolute;
  width: 100px;
  height: 100px;
  background-size: 100% 100%;
  background-image: url("~@/assets/image/heart.png");
  pointer-events: none;
  transform: translate(-50%, -50%);
  animation: love 2.5s linear infinite;
  z-index: 100000;
}

@keyframes love {
  0% {
    transform: translate(-50%, -50%);
    opacity: 1;
  }
  100% {
    transform: translate(-50%, -1000%);
    opacity: 0;
  }
}
</style>
