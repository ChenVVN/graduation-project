<template>
  <div>
    <el-dialog
      :title="insideBaseInfo.title"
      :width="insideBaseInfo.width"
      :visible.sync="insideVisible"
      :close-on-click-modal="insideBaseInfo.closeOnClickModal"
      @close="close"
      :append-to-body="appendToBody"
    >
      <el-divider class="hr-header" />

      <!--自定义拓展插槽-->
      <div class="dialog-body-block">
        <slot></slot>
      </div>

      <div class="sk-dialog-form-footer">
        <el-button type="danger" size="mini" @click="close">取消</el-button>
        <el-button type="primary" size="mini" @click="submit">{{
          insideBaseInfo.submitText
        }}</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
const BASE_INFO = {
  title: '编辑',
  width: '500px',
  closeOnClickModal: false,
  submitText: '提交',
  minHeight: '300px',
}

export default {
  name: 'EasyEditDialog',
  props: {
    /**
     * 基本 参数
     */
    baseInfo: {
      type: Object,
      default: () => {
        return BASE_INFO
      },
    },
    visible: false,
    appendToBody: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      insideBaseInfo: {
        ...BASE_INFO,
        ...this.baseInfo,
      },
      insideVisible: this.visible,
    }
  },
  computed: {
    // 基本样式
    baseStyleObj() {
      return {
        minHeight: this.insideBaseInfo.minHeight,
      }
    },
  },
  watch: {
    visible(val) {
      this.insideVisible = val

      if (val) {
        // 打开，赋值
        this.insideBaseInfo = {
          ...BASE_INFO,
          ...this.baseInfo,
        }
      } else {
        // 关闭，初始化
        this.insideBaseInfo = { ...BASE_INFO }
      }
    },
  },
  methods: {
    close() {
      this.insideVisible = false
      this.$emit('close')
    },
    submit() {
      this.$emit('submit')
    },
  },
}
</script>

<style scoped lang="scss">
.hr-header {
  margin-top: -20px;
}
.sk-dialog-form-footer {
  display: flex;
  justify-content: flex-end;
}
.dialog-body-block {
  .el-select {
    width: 100%;
  }
}
</style>
