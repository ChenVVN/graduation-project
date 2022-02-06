<template>
  <div>
    <top-bar>
      <div class="left-part">
        <el-input placeholder="搜索" size="small" class="base-input"></el-input>
        <el-button size="small">刷新</el-button>
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
        :col-entity="colEntity"
        :data-list="dataList"
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
      :visible="editCategories.visible"
      :base-info="dialogBaseInfo"
      @close="onClose"
      @submit="onSubmit"
    >
      <el-form label-position="left" label-width="100px">
        <div v-for="(item, index) in renderForm" :key="index">
          <el-form-item :label="item.label">
            <!--          input-->
            <el-input
              v-model="editCategories.form[item.key]"
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
  getCategoriesList,
  addCategoriesList,
  updateCategoriesList,
} from "@/api/categories";
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
        { propName: "short", labelName: "简称" },
        { propName: "fullname", labelName: "材料种类" },
        { propName: "fullname_zh", labelName: "材料种类（中）" },
        { propName: "create_time", labelName: "时间", class: "z_time_style" },
        { propName: "opr", labelName: "操作", isSlot: true },
      ],

      totalCount: 0,
      dataList: [],
      page: 1,
      size: 10,

      editCategories: {
        visible: false,
        tag: 0,

        form: {
          id: "",
          short: "",
          fullname: "",
          fullname_zh: "",
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
      }[this.editCategories.tag];
    },
    dialogBaseInfo() {
      return {
        title: `${this.tag.val}材料种类信息`,
        width: "600px",
      };
    },
    renderForm() {
      return [
        { key: "short", label: "简称" },
        { key: "fullname", label: "材料种类" },
        { key: "fullname_zh", label: "材料种类(中)" },
      ];
    },
  },
  methods: {
    onClose() {
      this.editCategories.visible = false;
    },
    readyToAdd() {
      this.editCategories = {
        visible: true,
        tag: 0,
        form: {},
      };
    },
    readyToUpdate(row) {
      this.editCategories = {
        visible: true,
        tag: 1,
        form: {
          id: row.id,
          short: row.short,
          fullname: row.fullname,
          fullname_zh: row.fullname_zh,
        },
      };
    },
    async onSubmit() {
      if (this.editCategories.tag === 0) {
        try {
          await addCategoriesList(this.editCategories.form);
          this.$message({ message: `${this.tag.val}成功`, type: "success" });
          this.loadData();
          this.onClose();
        } catch (e) {
          console.error(e);
        }
      }
      if (this.editCategories.tag === 1) {
        try {
          await updateCategoriesList(this.editCategories.form);
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
        const { count, list } = await getCategoriesList();
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
