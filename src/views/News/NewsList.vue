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
        { propName: "icon", labelName: "图标" },
        { propName: "title", labelName: "标题" },
        { propName: "type", labelName: "类型" },
        { propName: "desc", labelName: "描述" },
        { propName: "create_time", labelName: "时间", class: "z_time_style" },
        { propName: "opr", labelName: "操作", isSlot: true },
      ],
    };
  },
};
</script>

<style>
</style>