<template>
  <div class="loginBar">
    <el-avatar icon="el-icon-user-solid" id="userHead"></el-avatar>
    <span id="loginSta">未登录</span>
  </div>
</template>

<script>
    export default {
        name: 'loginBar',
        components: {},
        data() {
            return {

            }
        }
    }
</script>

<style scoped>
    #loginSta {
        margin-top: 15px;
        font-size: 15px;
        margin-top: 20px
    }
    
    .loginBar {
        display: flex;
        height: 50px;
    }
    
    .loginBar #userHead {
        width: 40px;
        height: 40px;
        margin-top: 5px;
    }
</style>