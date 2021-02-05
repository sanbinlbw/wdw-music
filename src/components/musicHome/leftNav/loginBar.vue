<template>
  <div class="loginBar">
    <div v-if="!userInfo" style="cursor: pointer" @click="changeShowLogin(true)">
      <el-avatar
        icon="el-icon-user-solid"
        class="userHead"
        style="vertical-align: middle"
      ></el-avatar>
      <span class="loginSta">未登录</span>
    </div>
    <div style="cursor: pointer" v-else>
      <el-avatar
        :src="userInfo.avatarUrl"
        class="userHead"
        style="vertical-align: middle"
      ></el-avatar>
      <span class="loginSta">{{ userInfo.nickname }}</span>
      <span class="loginSta" @click="logout">退出</span>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapMutations, mapActions } from "vuex";
export default {
  name: "loginBar",
  components: {},
  computed: {
    ...mapGetters([
      //用户信息
      "userInfo",
    ]),
  },
  data() {
    return {};
  },
  methods: {
    //打开登录窗口
    changeShowLogin(isShow) {
      this.$store.dispatch("changeShowLogin", isShow);
    },
    //登出
    logout() {
      this.$http
        .get("/logout")
        .then((res) => {
          this.$message.success("成功退出");
          this.$store.dispatch("saveUserInfo", null);
          this.$store.dispatch("savePersonalList", []);
        })
        .catch((error) => {
          console.log(error);
        });
    },
  },
};
</script>

<style scoped>
.loginSta {
  font-size: 15px;
  margin-right: 5px;
}

.loginBar {
  display: flex;
  height: 50px;
}

.loginBar .userHead {
  width: 40px;
  height: 40px;
  margin-top: 0px;
}
</style>
