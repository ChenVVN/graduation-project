<template>
  <div>
    <el-pagination
      v-if="pagination"
      v-show="pagingPosition === 'top'"
      style="margin-bottom: 8px"
      background
      small
      class="mt20"
      @size-change="sizeChange"
      @current-change="pageChange"
      :current-page="pageable.pageIndex"
      :page-size="pageable.pageSize"
      :page-sizes="pageable.pageSizes"
      :layout="pageLayout || defaultPageLayout"
      :total="pageable.totalCount"
    >
    </el-pagination>

    <el-table
      :size="tableSize"
      :data="dataList"
      :border="border"
      @expand-change="expandChange"
      @select="handleSelect"
      @select-all="handleSelectAll"
    >
      <!-- 选中框 -->
      <el-table-column
        v-if="selection"
        type="selection"
        width="30px"
      ></el-table-column>

      <el-table-column
        v-for="(colItem, colIndex) in colEntity"
        :key="colIndex"
        :prop="colItem.propName"
        :label="colItem.labelName"
        :width="colItem.width"
        :min-width="colItem.minWidth"
        :type="colItem.type"
        :align="colItem.align || 'left'"
        :sortable="colItem.sort"
        :fixed="colItem.fixed"
      >
        <!--头部-->
        <template slot="header" slot-scope="scope">
          <!--自定义头部-->
          <span v-if="colItem.isHeader">
            <slot :name="colItem.propName + '_header'" :rowData="scope.row">
            </slot>
          </span>
          <!--默认头部-->
          <span v-else>{{ colItem.labelName }}</span>
        </template>

        <!--内容-->
        <template slot-scope="scope">
          <!--自定义内容-->
          <div v-if="colItem.isSlot">
            <slot
              :name="colItem.propName"
              :rowData="scope.row"
              :originScope="scope"
            >
            </slot>
          </div>
          <!--默认内容-->
          <div v-else :class="colItem.class || ''">
            <span v-if="scope.row[colItem.propName] !== ''">{{
              scope.row[colItem.propName]
            }}</span>
            <sk-place v-else></sk-place>
          </div>
        </template>
      </el-table-column>
    </el-table>

    <el-pagination
      v-if="pagination"
      v-show="pagingPosition === 'bottom'"
      background
      small
      class="mt20"
      @size-change="sizeChange"
      @current-change="pageChange"
      :current-page="pageable.pageIndex"
      :page-size="pageable.pageSize"
      :page-sizes="pageable.pageSizes"
      :layout="pageLayout || defaultPageLayout"
      :total="pageable.totalCount"
    >
    </el-pagination>
  </div>
</template>

<script>
export default {
  name: "EasyTable",
  props: {
    pageLayout: {},
    pagingPosition: {
      type: String,
      default: () => {
        return "bottom";
      },
    },
    tableSize: {
      // 表格大小
      type: String,
      validator: function (value) {
        // 默认值的校验
        return ["", "medium", "small", "mini"].indexOf(value) !== -1;
      },
      default: "",
    },
    dataList: {
      // 表格数据
      type: Array,
      default: () => [],
    },
    colEntity: {
      // 表格列的渲染, 参数: propName,labelName,class,width
      type: Array,
      default: () => {
        return [
          {
            propName: "id",
            labelName: "ID",
            width: "100px",
            align: "center",
            // isSlot: false,     // 自定义内容
            // type: 'expand',    // 自定义折叠面板拓展
            // class: '',         // 内容样式
            // minWidth: '10px'   // 最小宽度
          },
        ];
      },
    },
    pagination: {
      // 需要分页,默认 true， 设置为 false 关闭分页功能
      default: true,
    },
    pageable: {
      // 分页参数
      type: Object,
      default: () => {
        return {
          pageIndex: 1, // 页码
          pageSize: 10, // 默认每页条数
          pageSizes: [10, 20, 50, 100], // 切换每页显示条数
          totalCount: 0, // 总条数
        };
      },
    },
    border: {
      // 表格边框,默认 false
      default: false,
    },
    selection: {
      // 是否开启多选
      default: false,
    },
  },
  computed: {},
  data() {
    return {
      defaultPageLayout: "total, sizes, prev, pager, next, jumper",
    };
  },
  methods: {
    handleSelect(liChosen) {
      this.$emit("on-select", liChosen);
    },
    handleSelectAll(liChosen) {
      this.$emit("on-select", liChosen);
    },
    sizeChange(pageSize) {
      // 每页条数改变 (子组件提供触发)
      this.$emit("changeSize", pageSize); // 派发事件 changeSize ,提供外部调用
    },
    pageChange(pageIndex) {
      // 页码变化
      this.$emit("changePage", pageIndex);
    },
    expandChange(row, expandedRows) {
      // 折叠table 触发事件
      this.$emit("expandChange", row, expandedRows);
    },
  },
  created() {},
};
</script>

<style scoped lang="scss">
</style>
