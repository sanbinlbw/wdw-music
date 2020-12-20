<template>
  <div class="banner">
    <!-- 轮播图 -->
    <el-carousel :interval="4000" type="card" height="280px">
      <el-carousel-item v-for="(item, index) in bannerInfo" :key="index">
        <el-image
          @click="changeUrl(item.targetId)"
          :src="item.imageUrl"
          fit="fill"
          style="height: 90%; border-radius: 10px"
        ></el-image>
        <el-tag
          :type="item.typeTitle === '独家' ? 'danger' : 'primary'"
          effect="dark"
          style="position: absolute; bottom: 10%; right: 0; border-radius: 5px"
        >
          {{ item.typeTitle }}
        </el-tag>
      </el-carousel-item>
    </el-carousel>
  </div>
</template>

<script>
export default {
  name: "banner",
  props: {
    bannerInfo: Array,
  },
  components: {},
  data() {
    return {};
  },
  methods: {
    //防抖
    // debounce(func, ms) {
    //     let timer;
    //     return function(...args) {
    //         if (timer) {
    //             clearTimeout(timer)
    //         }
    //         timer = setTimeout(() => {
    //             func.apply(this, args)
    //         }, ms)
    //     }
    // },

    // 将歌曲id传入
    changeUrl(musicId) {
      this.$emit("changeUrl", musicId);
    },
  },
};
</script>

<style scoped>
/* 轮播图样式 */

.el-carousel__item:nth-child(2n) {
  background-color: #ffffff;
}

.el-carousel__item:nth-child(2n + 1) {
  background-color: #ffffff;
}
</style>
