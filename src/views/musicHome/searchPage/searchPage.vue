<template>
  <div class="searchPage">
    <span
      style="font-size: 10px; color: #adadad; font-weight: 400"
      v-show="this.$route.path == '/musicHome/searchPage/searchBySong'"
      >找到{{ songAll.songCount }}首单曲</span
    >
    <span
      style="font-size: 10px; color: #adadad; font-weight: 400"
      v-show="this.$route.path == '/musicHome/searchPage/searchBySinger'"
      >找到4位歌手</span
    >
    <span
      style="font-size: 10px; color: #adadad; font-weight: 400"
      v-show="this.$route.path == '/musicHome/searchPage/searchByPlayList'"
      >找到1000张专辑</span
    >
    <span
      style="font-size: 10px; color: #adadad; font-weight: 400"
      v-show="this.$route.path == '/musicHome/searchPage/searchByVideo'"
      >找到10个视频</span
    >
    <div id="headTab">
      <!-- 头部导航栏 -->
      <searchHeadTab />
    </div>
    <div v-loading="isLoading"
    element-loading-text="加载中...">
      <!-- 子路由 -->
      <router-view
        id="secondRoute"
        :songAll="songAll"
        @getSongPage="getSongPage"
      />
    </div>
  </div>
</template>

<script>
    import {
        mapGetters,
        mapMutations,
        mapActions
    } from "vuex";
    import searchHeadTab from "@/components/musicHome/searchPage/searchHeadTab";
    export default {
        name: "searchPage",
        props: {
            //搜索栏内容
            searchData: String,
        },
        components: {
            searchHeadTab,
        },
        computed: {
            ...mapGetters([
                // 搜索信息
                "searchInfo",
                // 加载状态
                "isLoading",
            ]),
        },
        data() {
            return {
                //歌曲总数及歌曲
                songAll: {
                    //歌曲总数
                    songCount: 0,
                    //歌曲列表
                    songList: [],
                },
            };
        },
        methods: {
            //请求歌曲数据
            getSongPage(offset) {
                this.$store.dispatch("changeIsLoading", true);
                this.songAll.songList = [];
                this.$http
                    .get("/cloudsearch", {
                        params: {
                            keywords: this.searchInfo.trim(),
                            type: 1,
                            limit: 50,
                            offset: offset * 50,
                        },
                    })
                    .then((res) => {
                        console.log(res.data.result);
                        this.songAll.songCount = res.data.result.songCount;
                        this.songAll.songList = res.data.result.songs;
                        this.$store.dispatch("changeIsLoading", false);
                    });
            },
        },
        created() {
            if (this.searchInfo.trim() !== "") this.getSongPage(0);
        },
    };
</script>

<style scoped>
    #headTab {
        /* width: 100%; */
        width: 450px;
        height: 70px;
        margin-left: 50%;
        transform: translateX(-50%);
    }
    /* 子路由样式 */
    
    #secondRoute:hover {
        overflow-y: overlay;
    }
    
    #secondRoute {
        padding-right: 17px;
        padding-left: 3px;
        height: 70vh;
        width: 100%;
        overflow-y: hidden;
        overflow-x: hidden;
    }
</style>