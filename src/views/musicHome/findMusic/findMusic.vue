<template>
  <div class="findMusic">
    <div id="headTab">
      <!-- 头部导航栏 -->
    <headTab/>
  </div>
  <div>
    <!-- 二级路由 -->
    <router-view/>
  </div>
  </div>
  
</template>

<script>
    import headTab from './headTab'
    export default {
        name: 'findMusic',
        components: {
            headTab
        },
        data() {
            return {

            }
        }
    }
</script>

<style scoped>
    #headTab {
        /* width: 100%; */
        margin-left: 30%;
    }
</style>