<template>
  <div class="songList">
    <div class="tag">
      <!-- 当前标签 -->
      <div class="tagChoose" @click="isAllTags = !isAllTags">{{ tagKind }} ></div>
      <!-- 热门标签 -->
      <div class="hotTags">
        <span
          v-for="(item, index) in hotTags"
          :key="index"
          :class="{ actHotTag: tagKind === item.name, hotTag: tagKind !== item.name }"
          @click="selectTag(item.name)"
        >
          {{ item.name }}
        </span>
      </div>
    </div>
    <div v-loading="isLoading" element-loading-text="加载中...">
      <songListInfo
        :playLists="playLists"
        :tagKind="tagKind"
        :allTags="allTags"
        @selectTag="selectTag"
        :isAllTags="isAllTags"
      />
      <pagination
        :count="count"
        :tagKind="tagKind"
        @getSongListPage="getGoodMusicList"
        ref="pagination"
      />
    </div>
    <br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br />
  </div>
</template>

<script>
import pagination from "@/components/musicHome/findMusic/songList/pagination";
import songListInfo from "@/components/musicHome/findMusic/songList/songListInfo";
import { mapGetters, mapMutations, mapActions } from "vuex";
export default {
  name: "songList",
  components: {
    // 分页
    pagination,
    // 遍历的歌单
    songListInfo,
  },
  computed: {
    ...mapGetters([
      // 加载状态
      "isLoading",
    ]),
  },
  data() {
    return {
      // 选择的歌单种类
      tagKind: this.$route.query.tag ? this.$route.query.tag : "全部歌单",
      // 热门歌单标签
      hotTags: [],
      // 歌单
      playLists: [],
      // 当前类型歌单总数
      count: 0,
      // 鼠标悬停的判断
      currentIndex: -1,
      // 是否进行全部标签选择
      isAllTags: false,
      // 不同类型对应标签
      allTags: {
        // 对应风格
        categories: {},
        // 对应icon
        icon: {
          0: "iconfont icon-diqiu",
          1: "el-icon-dessert",
          2: "iconfont icon-kafei",
          3: "iconfont icon-xiaolian",
          4: "iconfont icon-fanggepailie",
        },
        // 风格对应标签
        sub: [[], [], [], [], []],
      },
    };
  },
  methods: {
    //获取热门歌单标签信息
    getHotMusicListTags() {
      this.$http.get("playlist/hot").then((res) => {
        this.hotTags = res.data.tags;
        console.log(res.data);
      });
    },
    //获取所有歌单标签信息
    getAllMusicListTags() {
      this.$http.get("playlist/catlist").then((res) => {
        this.allTags.categories = res.data.categories;
        for (let tag of res.data.sub) {
          switch (tag.category) {
            case 0:
              this.allTags.sub[0].push(tag);
              break;
            case 1:
              this.allTags.sub[1].push(tag);
              break;
            case 2:
              this.allTags.sub[2].push(tag);
              break;
            case 3:
              this.allTags.sub[3].push(tag);
              break;
            case 4:
              this.allTags.sub[4].push(tag);
              break;
          }
        }
        console.log(res.data);
      });
    },
    //获取对应标签页精品歌单
    getGoodMusicList(cat, page) {
      this.$store.dispatch("changeIsLoading", true);
      this.$http
        .get("/top/playlist", {
          params: {
            cat: cat,
            offset: page * 50,
          },
        })
        .then((res) => {
          // console.log(res.data);
          this.playLists = res.data.playlists;
          this.count = res.data.total;
          this.$store.dispatch("changeIsLoading", false);
        });
    },
    //获取精品歌单
    // getNiceMusicList(cat, page) {
    //   this.$store.dispatch("changeIsLoading", true);
    //   this.$http
    //     .get("/top/playlist/highquality", {
    //       params: {
    //         cat: cat,
    //       },
    //     })
    //     .then((res) => {
    //       console.log(res.data);
    //       // this.playLists = res.data.playlists;
    //       // this.count = res.data.total;
    //       this.$store.dispatch("changeIsLoading", false);
    //     });
    // },
    // 选中标签
    selectTag(tag) {
      if (this.tagKind !== tag) {
        this.tagKind = tag;
        this.getGoodMusicList(tag, 0);
        this.isAllTags = false;
        // 返回第一页
        this.$refs.pagination.backNumOne();
      }
    },
  },
  created() {
    // 资源获取
    this.getHotMusicListTags();
    this.getAllMusicListTags();
    this.getGoodMusicList(this.tagKind, 0);
    // this.getNiceMusicList(this.tagKind, 0);
  },
};
</script>

<style scoped>
/* 选择标签 */
.tagChoose {
  position: absolute;
  width: 120px;
  height: 35px;
  line-height: 35px;
  text-align: center;
  border: 1px solid rgba(0, 0, 0, 0.2);
  border-radius: 30px;
  color: #373737;
  cursor: pointer;
}
.tagChoose:hover {
  background: #f2f2f2;
}
/* 热门标签 */
.hotTags {
  height: 35px;
  line-height: 40px;
  position: absolute;
  right: 5%;
}
.hotTag {
  margin-left: 30px;
  font-size: 13px;
  opacity: 0.8;
  cursor: pointer;
}
.hotTag:hover {
  opacity: 1;
}
/* 标签被选中时 */
.actHotTag {
  color: #d03535;
  margin-left: 30px;
  padding: 5px;
  font-size: 13px;
  border-radius: 10px;
  cursor: pointer;
  background: #fcf4f4;
}
.tag {
  width: 100%;
  height: 40px;
  position: relative;
}
</style>
