<template>
  <div>
    <top-bar>
      <div class="left-part">
        <el-input placeholder="搜索" size="small" class="base-input"></el-input>
        <el-button size="small" @click="loadData">刷新</el-button>
      </div>
      <div class="right-part">
        <div class="item" @click="readyToAdd">
          <i class="el-icon-circle-plus"></i>
          <p class="text">添加</p>
        </div>
      </div>
    </top-bar>

    <el-card class="main-body">
      <easy-table
        :data-list="dataList"
        :col-entity="colEntity"
        :pageable="pageEntity"
        tableSize="small"
      >
        <template #opr="{ rowData: row }">
          <el-button
            size="mini"
            type="danger"
            circle
            icon="el-icon-edit"
            title="修改"
            @click="readyToUpdate(row)"
          ></el-button>
        </template>
      </easy-table>
    </el-card>

    <easy-edit-dialog
      :visible="addOrUpdate.visible"
      :base-info="dialogBaseInfo"
      @close="onClose"
      @submit="onSubmit"
    >
      <el-form label-position="left" label-width="80px">
        <div v-for="(item, index) in renderForm" :key="index">
          <el-form-item :label="item.label">
            <!--          input-->
            <el-input
              v-model="addOrUpdate.form[item.key]"
              :placeholder="`请输入${item.label}`"
            ></el-input>
          </el-form-item>
        </div>
      </el-form>
    </easy-edit-dialog>
  </div>
</template>

<script>
import EasyTable from "@/components/EasyTable/Index";
import {
  getDatasheetList,
  addDatasheetList,
  updateDatasheetList,
} from "@/api/datasheet";
import EasyEditDialog from "@/components/EasyEditDialog/Index";

export default {
  components: {
    EasyTable,
    EasyEditDialog,
  },
  data() {
    return {
      colEntity: [
        { propName: "id", labelName: "ID", width: "100px" },
        { propName: "title", labelName: "标题" },
        { propName: "categories", labelName: "类别" },
        { propName: "grade", labelName: "型号" },
        { propName: "create_time", labelName: "创建时间" },
        { propName: "opr", labelName: "操作", isSlot: true, width: "100px" },
      ],

      totalCount: 0,
      dataList: [],
      page: 1,
      size: 10,

      addOrUpdate: {
        visible: false,
        tag: 0,

        form: {
          id: "",
          title: "",
          categories: "",
          grade: "",
        },
      },
    };
  },
  computed: {
    pageEntity() {
      return {
        pageIndex: this.page,
        pageSize: this.size,
        pageSizes: [10, 20, 50, 100], // 切换每页显示条数
        totalCount: this.totalCount,
      };
    },
    tag() {
      return {
        0: { key: "add", val: "添加" },
        1: { key: "update", val: "修改" },
      }[this.addOrUpdate.tag];
    },
    dialogBaseInfo() {
      return {
        title: `${this.tag.val}物性表信息`,
        width: "500px",
      };
    },
    renderForm() {
      return [
        { type: "input", key: "title", label: "标题" },
        { type: "input", key: "categories", label: "类别" },
        { type: "input", key: "grade", label: "型号" },
      ];
    },
  },
  methods: {
    onClose() {
      this.addOrUpdate.visible = false;
    },
    readyToAdd() {
      this.addOrUpdate = {
        visible: true,
        tag: 0,
        form: {},
      };
    },
    readyToUpdate(row) {
      this.addOrUpdate = {
        visible: true,
        tag: 1,
        form: {
          id: row.id,
          title: row.title,
          categories: row.categories,
          grade: row.grade,
        },
      };
    },
    async onSubmit() {
      if (this.addOrUpdate.tag === 0) {
        try {
          await addDatasheetList(this.addOrUpdate.form);
          this.$message({ message: `${this.tag.val}成功`, type: "success" });
          this.loadData();
          this.onClose();
        } catch (e) {
          console.error(e);
        }
      }
      if (this.addOrUpdate.tag === 1) {
        try {
          await updateDatasheetList(this.addOrUpdate.form);
          this.$message({ message: `${this.tag.val}成功`, type: "success" });
          this.loadData();
          this.onClose();
        } catch (e) {
          console.error(e);
        }
      }
    },
    async loadData() {
      try {
        const { count, list } = await getDatasheetList();
        this.totalCount = count;
        this.dataList = list;
      } catch (e) {
        console.error(e);
      }
    },
  },
  created() {
    this.loadData();
  },
};
</script>

<style scoped lang="scss">
.main-body {
  margin: 8px;
}
</style>
