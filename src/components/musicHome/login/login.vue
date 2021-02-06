<template>
  <div class="login">
    <img
      src="@/assets/image/login.svg"
      alt=""
      style="position: absolute; left: 50%; transform: translateX(-50%); top: 8%"
    />
    <!-- 关闭键 -->
    <i
      class="el-icon-close"
      style="
        position: absolute;
        right: 0;
        top: 0;
        font-size: 30px;
        color: #b5b4b4;
        cursor: pointer;
      "
      @click="changeShowLogin(false)"
    ></i>
    <!-- 登录表单 -->
    <el-form
      label-width="0px"
      class="logForm"
      :model="login_form"
      :rules="loginFromRules"
      ref="loginFormRef"
      @keyup.enter.native="login()"
    >
      <el-form-item prop="account">
        <el-input
          style="opacity: 0.7"
          placeholder="请输入手机号"
          prefix-icon="el-icon-user"
          v-model="login_form.phone"
        />
      </el-form-item>
      <el-form-item prop="password">
        <el-input
          style="opacity: 0.7"
          placeholder="请输入密码"
          prefix-icon="el-icon-lock"
          v-model="login_form.password"
          show-password
        />
      </el-form-item>
    </el-form>
    <div class="logBtn" @click="login()">登录</div>
  </div>
</template>

<script>
export default {
  name: "login",
  components: {},
  data() {
    return {
      //登录时的表单绑定
      login_form: {
        phone: "",
        password: "",
      },
      //登录的表单验证规则
      loginFromRules: {
        //验证账号
        phone: [
          {
            required: true,
            message: "请输入手机号",
            trigger: "blur",
          },
        ],
        //验证密码
        password: [
          {
            required: true,
            message: "请输入密码",
            trigger: "blur",
          },
        ],
      },
    };
  },
  methods: {
    //点击登录
    async login() {
      await this.$http.get("login/cellphone", { params: this.login_form }).then((res) => {
        // console.log(res);
        if (res.status !== 200) return this.$message.error("登陆失败,请检查登录信息!");
        this.$message.success("登陆成功");
        this.$store.dispatch("saveUserInfo", res.data.profile);
        this.getUserPrivatePlayList(res.data.profile.userId);
        this.$emit("showLogin", false);
      });
    },
    //查询用户私人歌单
    getUserPrivatePlayList(userId) {
      this.$http.get("user/playlist", { params: { uid: userId } }).then((res) => {
        // console.log(res.data);
        this.$store.dispatch("savePersonalList", res.data.playlist);
      });
    },
    //打开登录窗口
    changeShowLogin(isShow) {
      this.$store.dispatch("changeShowLogin", isShow);
    },
  },
};
</script>

<style scoped>
.login {
  z-index: 500;
  position: fixed;
  width: 450px;
  height: 500px;
  left: 50%;
  top: 10%;
  background: #fff;
  box-shadow: #cecccc 0px 0px 2px 2px;
  transform: translate(-50%);
}
.logForm {
  position: absolute;
  width: 350px;
  height: 150px;
  left: 10%;
  top: 53%;
}
.logBtn {
  position: absolute;
  width: 70%;
  padding: 10px 15px;
  background: #ea4848;
  text-align: center;
  color: #fff;
  cursor: pointer;
  border-radius: 20px;
  top: 78%;
  left: 50%;
  transform: translateX(-50%);
}
.logBtn:hover {
  background: #c72e2e;
}
</style>
