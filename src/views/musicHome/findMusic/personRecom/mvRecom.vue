<template>
  <div class="mvRecom">
    <el-row :gutter="10">
        <el-col :span="8" v-for="(item,index) in mvRecomList" :key="index" style="margin-bottom: 30px;">
            <!-- mv封面 -->
            <div id="mvDetail" @mouseover="addDetail(index)" @mouseleave="reduceDetail">
                <el-image :src="item.picUrl" fit="fill" style="width: 100%;height: 220px;border-radius: 8px;"></el-image>
                <div style="position: absolute;top: 5%;right: 3%;color: #ffffff;">
                  <!-- 播放量 -->
                  <img src="@/assets/image/play_2.svg" alt="" style="width: 15px;height: 15px; border-radius: 100%;margin-bottom: -1.5px;">
                  {{item.playCount >= 10000 ? (item.playCount/10000).toFixed(0)+'万' : item.playCount}}
                </div>
                <!-- 鼠标停靠出现介绍 -->
                <div :class="{'detailAppear':currentIndex === index,'detailNone':currentIndex !== index}">
                    <span style="color: #ffffff;">{{item.copywriter}}</span>
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
                //鼠标悬停的判断
                currentIndex: -1,
            }
        },
        methods: {
            // 鼠标移入出现动画
            addDetail(index) {
                this.currentIndex = index
            },
            // 鼠标移出取消动画
            reduceDetail() {
                this.currentIndex = -1
            }
        },
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
    /* 悬停时的样式 */
    
    .detailAppear {
        display: block;
        width: 98%;
        height: 13%;
        padding-top: 2%;
        padding-left: 2%;
        border-radius: 8px;
        position: absolute;
        top: 0;
        background: rgba(0, 0, 0, 0.4)
    }
    
    .detailNone {
        display: none;
    }
</style>