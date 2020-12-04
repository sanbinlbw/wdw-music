<template>
  <div class="mvRecom">
    <el-row :gutter="10">
        <el-col :span="8" v-for="(item,index) in mvRecomList" :key="index" style="margin-bottom: 30px;">
            <!-- mv封面 -->
            <div id="mvDetail">
                <el-image :src="item.picUrl" fit="fill" style="height: 220px;border-radius: 8px;"></el-image>
                <div style="position: absolute;top: 5%;right: 3%;color: #ffffff;">
                  <!-- 播放量 -->
                  <img src="@/assets/image/play_2.svg" alt="" style="width: 15px;height: 15px; border-radius: 100%;margin-bottom: -1.5px;">
                  {{item.playCount >= 10000 ? (item.playCount/10000).toFixed(0)+'万' : item.playCount}}
                </div>
            </div>
            <!-- mv介绍 -->
            <div id="mvIntro">
                <p id="mvName">{{item.name}}</p>
                <p id="mvArtistName">{{item.artistName}}</p>
            </div>
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
    #mvDetail {
        width: 100%;
        position: relative;
        cursor: pointer;
    }
    
    #mvName {
        font-size: 15px;
        cursor: pointer;
        color: #373737;
        opacity: 0.9;
    }
    
    #mvName:hover,
    #mvArtistName:hover {
        opacity: 1;
        color: #000000;
    }
    
    #mvArtistName {
        font-size: 13px;
        cursor: pointer;
        color: #373737;
        opacity: 0.8;
    }
</style>