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
      :visible="editApplication.visible"
      :base-info="dialogBaseInfo"
      @close="onClose"
      @submit="onSubmit"
    >
      <el-form label-position="left" label-width="80px">
        <div v-for="(item, index) in renderForm" :key="index">
          <el-form-item :label="item.label">
            <!--          input-->
            <el-input
              v-model="editApplication.form[item.key]"
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
  getApplicationList,
  addApplicationList,
  updateApplicationList,
} from "@/api/application";
import EasyEditDialog from "@/components/EasyEditDialog/Index";

export default {
  components: {
    EasyTable,
    EasyEditDialog,
  },
  data() {
    return {
      colEntity: [
        { propName: "id", labelName: "ID" },
        { propName: "name", labelName: "应用" },
        { propName: "name_zh", labelName: "应用（中）" },
        { propName: "create_time", labelName: "时间", class: "z_time_style" },
        { propName: "opr", labelName: "操作", isSlot: true },
      ],

      totalCount: 0,
      dataList: [],
      page: 1,
      size: 10,

      editApplication: {
        visible: false,
        tag: 0,

        form: {
          id: "",
          name: "",
          name_zh: "",
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
      }[this.editApplication.tag];
    },
    dialogBaseInfo() {
      return {
        title: `${this.tag.val}应用分类信息`,
        width: "500px",
      };
    },
    renderForm() {
      return [
        { key: "name", label: "应用" },
        { key: "name_zh", label: "应用(中)" },
      ];
    },
  },
  methods: {
    onClose() {
      this.editApplication.visible = false;
    },
    readyToAdd() {
      this.editApplication = {
        visible: true,
        tag: 0,
        form: {},
      };
    },
    readyToUpdate(row) {
      this.editApplication = {
        visible: true,
        tag: 1,
        form: {
          id: row.id,
          name: row.name,
          name_zh: row.name_zh,
        },
      };
    },
    async onSubmit() {
      if (this.editApplication.tag === 0) {
        try {
          await addApplicationList(this.editApplication.form);
          this.$message({ message: `${this.tag.val}成功`, type: "success" });
          this.loadData();
          this.onClose();
        } catch (e) {
          console.error(e);
        }
      }
      if (this.editApplication.tag === 1) {
        try {
          await updateApplicationList(this.editApplication.form);
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
        const { count, list } = await getApplicationList();
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

<style></style>
