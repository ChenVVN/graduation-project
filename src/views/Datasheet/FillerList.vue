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
      :visible="editFiller.visible"
      :base-info="dialogBaseInfo"
      @close="onClose"
      @submit="onSubmit"
    >
      <el-form label-position="left" label-width="80px">
        <div v-for="(item, index) in renderForm" :key="index">
          <el-form-item :label="item.label">
            <!--          input-->
            <el-input
              v-model="editFiller.form[item.key]"
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
import { getFillerList, addFillerList, updateFillerList } from "@/api/filler";
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
        { propName: "filler", labelName: "填充物" },
        { propName: "filler_zh", labelName: "填充物（中）" },
        { propName: "create_time", labelName: "时间", class: "z_time_style" },
        { propName: "opr", labelName: "操作", isSlot: true, width: "80px" },
      ],

      totalCount: 0,
      dataList: [],
      page: 1,
      size: 10,

      editFiller: {
        visible: false,
        tag: 0,

        form: {
          id: "",
          filler: "",
          filler_zh: "",
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
      }[this.editFiller.tag];
    },
    dialogBaseInfo() {
      return {
        title: `${this.tag.val}填充物信息`,
        width: "500px",
      };
    },
    renderForm() {
      return [
        { key: "filler", label: "填充物" },
        { key: "filler_zh", label: "填充物(中)" },
      ];
    },
  },
  methods: {
    onClose() {
      this.editFiller.visible = false;
    },
    readyToAdd() {
      this.editFiller = {
        visible: true,
        tag: 0,
        form: {},
      };
    },
    readyToUpdate(row) {
      this.editFiller = {
        visible: true,
        tag: 1,
        form: {
          id: row.id,
          filler: row.filler,
          filler_zh: row.filler_zh,
        },
      };
    },
    async onSubmit() {
      if (this.editFiller.tag === 0) {
        try {
          await addFillerList(this.editFiller.form);
          this.$message({ message: `${this.tag.val}成功`, type: "success" });
          this.loadData();
          this.onClose();
        } catch (e) {
          console.error(e);
        }
      }
      if (this.editFiller.tag === 1) {
        try {
          await updateFillerList(this.editFiller.form);
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
        const { count, list } = await getFillerList();
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
