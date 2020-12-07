<template>
  <div class="findMusic">
    <div id="headTab">
      <!-- 头部导航栏 -->
    <headTab/>
  </div>
  <div>
    <!-- 二级路由 -->
    <router-view id="secondRoute"/>
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
    
    #secondRoute:hover {
        overflow-y: overlay;
    }
    
    #secondRoute {
        padding-right: 17px;
        padding-left: 3px;
        height: 80vh;
        width: 100%;
        overflow-y: hidden;
        overflow-x: hidden;
    }
</style>