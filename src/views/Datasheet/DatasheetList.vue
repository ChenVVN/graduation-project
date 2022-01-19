<template>
  <div>
    <top-bar>
      <div class="left-part">
        <el-input placeholder="搜索" size="small"></el-input>
      </div>
      <div class="right-part">
        <div class="item">
          <svg-icon icon-class="add"></svg-icon>
          <p class="text">添加</p>
        </div>
      </div>
    </top-bar>
    <el-card class="main-body">
      <easy-table :col-entity="colEntity"></easy-table>
    </el-card>
  </div>
</template>

<script>
import TopBar from "@/components/TopBar/Index.vue";
import EasyTable from "@/components/EasyTable/Index";
export default {
  components: {
    TopBar,
    EasyTable,
  },
  data() {
    return {
      colEntity: [
        { propName: 'id', labelName: 'ID', width: '100px' },
        { propName: 'short', labelName: '简称' },
        { propName: 'fullname_en', labelName: '英文全称' },
        { propName: 'fullname_zh', labelName: '中文全称'},
        { propName: 'create_time', labelName: '时间', class: 'z_time_style' },
        { propName: 'operation', labelName: '操作',  width: '100px', isSlot: true },
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
