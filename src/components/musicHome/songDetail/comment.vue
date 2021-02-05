<template>
  <div class="comment">
    <div class="commit">
      <el-input
        type="textarea"
        placeholder="请输入内容"
        v-model="commentInfo"
        maxlength="140"
        show-word-limit
        resize="none"
        rows="4"
      >
      </el-input>
      <div class="orbtn" @click="sendComment()">评论</div>
    </div>
    <div style="margin-left: 20px" v-show="comment.hotComments.length > 0">
      <p style="font-weight: 600; cursor: default; margin-bottom: 2%">
        精彩评论({{ comment.hotComments.length }})
      </p>
      <!--精彩评论的信息-->
      <div
        v-for="(item, index) in comment.hotComments"
        :key="index"
        style="
          position: relative;
          width:87%
          border-top: 2px solid rgb(240, 240, 242);
          border-bottom: 1px solid rgb(240, 240, 242);
          padding: 15px 0;
          font-size: 15px;
        "
      >
        <div>
          <!--用户头像-->
          <img
            :src="item.user.avatarUrl"
            alt=""
            style="
              display: inline;
              width: 50px;
              height: 50px;
              border-radius: 25px;
              cursor: pointer;
            "
          />

          <!--评论信息-->
          <div style="margin-left: 60px; margin-top: -60px">
            <p>
              <span style="color: #4d99de; cursor: pointer">{{ item.user.nickname }}</span
              >: {{ item.content }}
            </p>

            <br v-if="item.beReplied.length > 0" />
            <!--子评论-->
            <div
              v-if="item.beReplied.length > 0"
              style="background-color: rgb(241, 241, 244); padding: 5px 5px"
            >
              <p v-for="(citem, index) in item.beReplied" :key="index">
                <span style="color: #4d99de; cursor: pointer">{{
                  citem.user.nickname
                }}</span
                >: {{ citem.content }}
              </p>
            </div>

            <p style="display: block; font-size: 13px; color: gray; opacity: 0.7">
              {{ item.time | dateFormat }}
            </p>
          </div>
        </div>
        <!-- 点赞等功能 -->
        <div style="position: absolute; right: 0; bottom: 1%; opacity: 0.9">
          <span v-if="!item.liked">
            <i class="iconfont icon-dianzan" style="font-size: 25px; cursor: pointer"></i
            >{{ item.likedCount }}
          </span>
          <span v-else>
            <i
              class="iconfont icon-dianzan"
              style="font-size: 25px; margin-right: 20px; color: #ff3a3a; cursor: pointer"
            ></i>
          </span>
          <i
            class="el-icon-chat-line-round"
            style="font-size: 25px; cursor: pointer; margin-left: 15px"
          ></i>
        </div>
      </div>
      <div
        v-show="comment.moreHot"
        style="
          display: inline-block;
          margin-left: 40%;
          margin-top: 3%;
          transform: translateX(-50%);
          border-radius: 20px;
          border: 1px solid #d8d8d8;
          padding: 5px 15px;
          cursor: pointer;
        "
      >
        更多精彩评论>
      </div>
    </div>
    <div style="margin-left: 20px" v-show="comment.total > 0">
      <p style="font-weight: 600; cursor: default; margin-bottom: 2%">
        最新评论({{ comment.total }})
      </p>
      <!--最新评论的信息-->
      <div
        v-for="(item, index) in comment.comments"
        :key="index"
        style="
          position: relative;
          width:87%
          border-top: 2px solid rgb(240, 240, 242);
          border-bottom: 1px solid rgb(240, 240, 242);
          padding: 15px 0;
          font-size: 15px;
        "
      >
        <div>
          <!--用户头像-->
          <img
            :src="item.user.avatarUrl"
            alt=""
            style="
              display: inline;
              width: 50px;
              height: 50px;
              border-radius: 25px;
              cursor: pointer;
            "
          />

          <!--评论信息-->
          <div style="margin-left: 60px; margin-top: -60px">
            <p>
              <span style="color: #4d99de; cursor: pointer">{{ item.user.nickname }}</span
              >: {{ item.content }}
            </p>

            <br v-if="item.beReplied.length > 0" />
            <!--子评论-->
            <div
              v-if="item.beReplied.length > 0"
              style="background-color: rgb(241, 241, 244); padding: 5px 5px"
            >
              <p v-for="(citem, index) in item.beReplied" :key="index">
                <span style="color: #4d99de; cursor: pointer">{{
                  citem.user.nickname
                }}</span
                >: {{ citem.content }}
              </p>
            </div>

            <p style="display: block; font-size: 13px; color: gray; opacity: 0.7">
              {{ item.time | dateFormat }}
            </p>
          </div>
        </div>
        <!-- 点赞等功能 -->
        <div style="position: absolute; right: 0; bottom: 1%; opacity: 0.9">
          <span v-if="!item.liked">
            <i class="iconfont icon-dianzan" style="font-size: 25px; cursor: pointer"></i
            >{{ item.likedCount }}
          </span>
          <span v-else>
            <i
              class="iconfont icon-dianzan"
              style="font-size: 25px; margin-right: 20px; color: #ff3a3a; cursor: pointer"
            ></i>
          </span>
          <i
            class="el-icon-chat-line-round"
            style="font-size: 25px; cursor: pointer; margin-left: 15px"
          ></i>
        </div>
      </div>
      <br /><br />
      <pagination
        :count="comment.total"
        @getCommentPage="getCommentPage"
        ref="pagination"
      />
    </div>
    <br /><br /><br /><br /><br /><br /><br /><br /><br /><br />
  </div>
</template>

<script>
import { mapGetters, mapMutations, mapActions } from "vuex";
import pagination from "./pagination";
export default {
  name: "comment",
  components: {
    pagination,
  },
  props: {
    // 评论数据
    comment: Object,
  },
  computed: {
    ...mapGetters([
      // 获得歌曲id
      "songId",
    ]),
  },
  data() {
    return {
      commentInfo: "",
    };
  },
  methods: {
    // 获取评论页
    getCommentPage(page) {
      this.$emit("getCommentPage", page);
    },
    //返回第一页
    backNumOne() {
      this.$refs.pagination.backNumOne();
    },
    // 发送评论
    sendComment() {
      this.$http
        .get("/comment", {
          params: {
            t: 1,
            type: 0,
            id: this.songId,
            content: this.commentInfo,
          },
        })
        .then((res) => {
          this.$message.success("评论成功,请刷新查看评论");
        })
        .catch((error) => {
          this.$message.error("请登录后再使用该功能哟");
          this.$store.dispatch("changeShowLogin", true);
        });
    },
  },
};
</script>

<style scoped>
.commit {
  position: relative;
  margin-top: 30px;
  margin-left: 20px;
  width: 49vw;
  height: 150px;
}
.orbtn {
  display: inline-block;
  position: absolute;
  right: 0;
  bottom: 5%;
  border-radius: 20px;
  border: 1px solid #d8d8d8;
  padding: 5px 15px;
  cursor: pointer;
}
.orbtn:hover {
  background: #f2f2f2;
}
</style>
