<template>
  <div class="mvRecom">
    <el-row :gutter="10">
        <el-col :span="8" v-for="(item,index) in mvRecomList" :key="index" style="margin-bottom: 30px;">
            <el-image :src="item.picUrl" fit="fill" style="height: 220px;border-radius: 8px;"></el-image>
        </el-col>
    </el-row>
  </div>
</template>

<script>
    export default {
        name: 'mvRecom',
        props: {
            mvRecomList: Array
        },
        components: {},
        data() {
            return {

            }
        }
    }
</script>

<style scoped>

</style>