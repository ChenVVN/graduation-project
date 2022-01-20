<template>
  <div class="register-container">
    <el-form
      :model="form"
      class="register-form"
      auto-complete="on"
      label-position="left"
    >
      <div class="title-container">
        <h3 class="title">注册信息</h3>
      </div>

      <el-form-item prop="username">
        <span class="tips">用 户 名</span>
        <el-input
          v-model="form.username"
          placeholder="请输入用户名"
          class="input"
        ></el-input>
      </el-form-item>

      <el-form-item prop="password">
        <span class="tips">密 码</span>
        <el-input
          v-model="form.password"
          placeholder="请输入密码"
          class="input"
        ></el-input>
      </el-form-item>

      <el-form-item prop="password2">
        <span class="tips">确认密码</span>
        <el-input
          v-model="form.password2"
          placeholder="请再次输入密码"
          class="input"
        ></el-input>
      </el-form-item>

      <el-form-item prop="mobile">
        <span class="tips">联系方式</span>
        <el-input
          v-model="form.mobile"
          placeholder="请输入手机号码"
          class="input"
        ></el-input>
      </el-form-item>

      <div class="base-line">
        <el-button
          :loading="loading"
          type="primary"
          class="btn"
          @click.native.prevent="handleLogin"
          >注册</el-button
        >
        <router-link class="text" to="/login">返回登录></router-link>
      </div>
    </el-form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      form: {
        username: "",
        password: "",
        password2: "",
        mobile: "",
      },
    };
  },
};
</script>

<style scoped lang="scss">
.register-container {
  min-height: 100%;
  width: 100%;
  // background-color: $bg;
  background: linear-gradient(120deg, #80cde5, #f4ba92 100%);
  overflow: hidden;

  .register-form {
    position: relative;
    width: 520px;
    max-width: 100%;
    padding: 160px 35px 0;
    margin: 0 auto;
    overflow: hidden;
    .tips {
      color: #303030;
      font-size: 16px;
    }
    .input {
      width: 85%;
      float: right;
    }
  }

  .base-line {
    margin-top: 20px;
    display: flex;
    justify-content: space-between;
    .btn {
      margin: 0 auto;
    }
    .text {
      color: #e7e7e7;
      margin-top: 10px;
    }
  }

  .title-container {
    position: relative;

    .title {
      font-size: 26px;
      color: #eee;
      margin: 0px auto 40px auto;
      text-align: center;
      font-weight: bold;
    }
  }
}
</style>