<template>
  <div class="privateRec">
    <!-- 独家推送 -->
    <el-row :gutter="40">
      <el-col :span="8" v-for="(item,index) in privateList" :key="index">
        <!-- 推送封面 -->
        <div id="privateDetail">
          <el-image :src="item.sPicUrl" fit="fill" style="height: 200px;"></el-image>
          <div style="position: absolute;top: 8%;left: 4%;opacity: 0.8;">
            <img src="@/assets/image/play.svg" alt="" style="width: 30px;height: 30px;background: #aca8a1; border-radius: 100%;">
          </div>
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
    export default {
        name: 'privateRec',
        props: {
            privateList: Array
        },
        components: {},
        data() {
            return {

            }
        }
    }
</script>

<style scoped>
    #privateDetail {
        position: relative;
    }
</style>