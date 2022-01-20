<template>
  <div>
    <top-bar>
      <div class="left-part">
        <el-input placeholder="搜索" size="small" class="base-input"></el-input>
        <el-button size="small">刷新</el-button>
      </div>
      <div class="right-part">
        <div class="item">
          <i class="el-icon-circle-plus"></i>
          <p class="text">添加</p>
        </div>
      </div>
    </top-bar>

    <el-card class="main-body">
      <easy-table :col-entity="colEntity">
        <template #opr>
          <el-button
            size="mini"
            type="danger"
            circle
            icon="el-icon-edit"
            title="修改"
            @click="readyToUpdate"
          ></el-button>
        </template>
      </easy-table>
    </el-card>
  </div>
</template>

<script>
import EasyTable from "@/components/EasyTable/Index";

export default {
  components: {
    EasyTable,
  },
  data() {
    return {
      colEntity: [
        { propName: "id", labelName: "ID" },
        { propName: "use", labelName: "用途" },
        { propName: "use_zh", labelName: "用途（中）" },
        { propName: "classification", labelName: "关联 应用种类", class: "z_time_style" },
        { propName: "create_time", labelName: "时间", class: "z_time_style" },
        { propName: "opr", labelName: "操作", isSlot: true },
      ],
    };
  },
};
</script>

<style scoped lang="scss">
.main-body {
  margin: 8px;
}
</style>