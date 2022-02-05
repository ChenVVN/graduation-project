<template>
  <div class="body">
    <el-card class="base-info">
      <div class="header">
        <div class="title">基本信息</div>
      </div>
      <div class="main">
        <div v-for="(item, index) in renderForm" :key="index">
          <div class="show-line">
            <div class="show-label">{{ item.label }}</div>
            <div class="show-value">cwn</div>
          </div>
        </div>
      </div>
    </el-card>
    <el-card class="edit-block">
      <div class="header">
        <div class="title">编辑资料</div>
      </div>
      <div class="main">
        <el-tabs v-model="activename">
          <el-tab-pane name="first" label="基本资料">
            <el-form label-width="80px">
              <el-form-item label="用户名">
                <el-input class="base-input" size="mini"></el-input>
              </el-form-item>
              <el-form-item label="用户邮箱">
                <el-input class="base-input" size="mini"></el-input>
              </el-form-item>
              <el-form-item label="手机号码">
                <el-input class="base-input" size="mini"></el-input>
              </el-form-item>
            </el-form>
            <div class="btn-line">
              <el-button type="primary" size="mini">提交</el-button>
            </div>
          </el-tab-pane>
          <el-tab-pane name="second" label="修改密码">
            <el-form label-width="80px">
              <el-form-item label="旧密码">
                <el-input class="base-input" size="mini"></el-input>
              </el-form-item>
              <el-form-item label="新密码">
                <el-input class="base-input" size="mini"></el-input>
              </el-form-item>
              <el-form-item label="确认密码">
                <el-input class="base-input" size="mini"></el-input>
              </el-form-item>
            </el-form>
            <div class="btn-line">
              <el-button type="primary" size="mini">提交</el-button>
            </div>
          </el-tab-pane>
        </el-tabs>
      </div>
    </el-card>
  </div>
</template>

<script>
export default {
  data() {
    return {
      activename: "first",
    };
  },
  computed: {
    renderForm() {
      return [
        { key: "username", label: "用户名" },
        { key: "email", label: "用户邮箱" },
        { key: "phone", label: "手机号码" },
      ];
    },
  },
};
</script>

<style scoped lang="scss">
.body {
  display: flex;
  .base-info {
    height: 100%;
    flex: 1;
    margin: 20px 5px;
  }
  .edit-block {
    flex: 2;
    margin: 20px 5px;
    .base-input {
      width: 90%;
      margin-left: 10px;
    }
    .btn-line {
      display: flex;
      justify-content: center;
    }
  }
  .header {
    border-bottom: 1px #e0dfdf solid;
    .title {
      margin-bottom: 20px;
      color: #156dd1;
      font-weight: 700;
    }
  }
}
.main {
  margin: 15px 20px;
  .show-line {
    display: flex;
    justify-content: space-between;
    margin: 10px 0;
    .show-label {
      margin-right: 5px;
    }
  }
}
</style>
