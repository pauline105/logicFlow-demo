<template>
  <div v-if="show == false" class="vab-control">
    <div v-if="show" @click="show = false">
      <i class="iconfont icon-zuoshuangjiantou"></i>
    </div>
    <div v-if="show == false" @click="show = true">
      <i class="iconfont icon-youshuangjiantou"></i>
    </div>
    <div>
      <div @click="amplification">
        <el-tooltip
          class="item"
          content="放大"
          effect="dark"
          placement="bottom"
        >
          <i class="iconfont icon-add"></i>
        </el-tooltip>
      </div>
      <div @click="narrow">
        <el-tooltip
          class="item"
          content="缩小"
          effect="dark"
          placement="bottom"
        >
          <i class="iconfont icon-hr"></i>
        </el-tooltip>
      </div>
      <div @click="neat">
        <el-tooltip
          class="item"
          content="重置缩放比列为100%"
          effect="dark"
          placement="bottom"
        >
          <i class="iconfont icon-shuaxin"></i>
        </el-tooltip>
      </div>
    </div>

    <div @click="dialogVisible = true">
      <el-tooltip class="item" content="属性" effect="dark" placement="bottom">
        <i class="iconfont icon-liebiao"></i>
      </el-tooltip>
    </div>
    <div>
      <el-tooltip class="item" content="校验" effect="dark" placement="bottom">
        <i class="iconfont icon-yiwanchengjiedian"></i>
      </el-tooltip>
    </div>
    <div @click="download">
      <el-tooltip class="item" content="对齐" effect="dark" placement="bottom">
        <i class="iconfont icon-dingduanduiqi-"></i>
      </el-tooltip>
    </div>
  </div>
  <div v-if="show" class="vab-control1">
    <div @click="show = false">
      <i class="iconfont icon-zuoshuangjiantou"></i>
    </div>
  </div>
  <el-dialog
    v-model="dialogVisible"
    :before-close="handleClose"
    custom-class="dialog"
    title="编辑属性"
    width="680px"
  >
    <el-form
      ref="formRef"
      class="demo-ruleForm"
      label-width="100px"
      :model="form"
      :rules="rules"
    >
      <el-form-item label="流程名称:" prop="name">
        <el-input v-model="form.name" />
      </el-form-item>
      <el-form-item label="API Key：" prop="name">
        <el-input v-model="form.name" />
      </el-form-item>
      <el-form-item label="描述：">
        <el-input v-model="form.name" resize="none" rows="5" type="textarea" />
      </el-form-item>
      <el-form-item label="流程管理员">
        <el-input v-model="form.name" />
      </el-form-item>
    </el-form>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="dialogVisible = false">
          确 定
        </el-button>
      </span>
    </template>
  </el-dialog>
</template>

<script>
  import { defineComponent } from 'vue'
  import LogicFlow from '@logicflow/core'
  import { Snapshot } from '@logicflow/extension'
  import { WorkArea } from '../../logicflow/index.js'
  import { reactive, toRefs, ref } from 'vue'

  LogicFlow.use(Snapshot)
  export default defineComponent({
    name: 'Control',
    props: {
      lf: {
        type: Object || String,
        default: () => {},
      },
    },
    emits: ['cat-data', 'setPercentage'],
    setup(prop, context) {
      const formRef = ref(null)
      const state = reactive({
        // 控制面板展开与否
        show: false,
        // 弹窗
        dialogVisible: false,
        // 弹窗表单
        form: {
          name: '',
          key: '',
          describe: '',
          admin: '',
        },
        // 表单验证
        rules: {
          name: [
            { required: true, message: '请输入流程名称', trigger: 'blur' },
          ],
          key: [{ required: true, message: '请输入API Key', trigger: 'blur' }],
        },
      })

      // 点击放大
      const amplification = () => {
        WorkArea.lf.zoom(true)
      }
      // 点击缩小
      const narrow = () => {
        WorkArea.lf.zoom(false)
      }
      // 排齐
      const neat = () => {
        WorkArea.lf.resetZoom()
        WorkArea.lf.focusOn()
      }
      //  导出
      const download = () => {
        WorkArea.lf.getSnapshot()
      }

      const ww = () => {
        console.log(WorkArea.lf.getTransform())
      }

      return {
        ...toRefs(state),
        formRef,
        WorkArea,
        narrow,
        amplification,
        download,
        neat,
        ww,
      }
    },
  })
</script>
<style scoped lang="scss">
  .vab-control {
    display: flex;
    width: 270px;
    height: 48px;
    padding: 10px 12px;
    box-sizing: border-box;
    align-items: center;
    justify-content: space-around;
    position: absolute;
    right: 20px;
    top: 76px;
    z-index: 99;
    background-color: #fff;
    border-radius: 8px;
    border: 1px solid #f7f7fa;
    & > div {
      display: flex;
      align-items: center;
      justify-content: center;
      width: 18px;
      height: 14px;
      &:hover {
        cursor: pointer;
        background-color: #f7f7fa;
      }
      i {
        font-size: 14px;
        color: #6a7280;
      }
    }
    > div:nth-child(2) {
      display: flex;
      justify-content: space-around;
      height: 30px;
      width: 90px;
      background-color: #f7f7fa;
      > div:hover {
        cursor: pointer;
        background-color: #eaeaf1;
      }
    }
  }
  .vab-control1 {
    position: absolute;
    right: 20px;
    top: 76px;
    z-index: 99;
    background-color: #fff;
    display: flex;
    width: 44px;
    height: 40px;
    padding: 12px;
    box-sizing: border-box;
    align-items: center;
    justify-content: space-around;
    border-radius: 8px;
    border: 1px solid #f7f7fa;
    & > div {
      display: flex;
      align-items: center;
      justify-content: center;
      width: 18px;
      height: 14px;
      &:hover {
        cursor: pointer;
        background-color: #f7f7fa;
      }
      i {
        font-size: 14px;
        color: #6a7280;
      }
    }
  }
  .dialog {
    .el-dialog__body {
      .el-input,
      .el-textarea {
        width: 320px;
        .el-input__inner,
        .el-textarea__inner {
          width: 320px;
        }
      }
    }
  }
</style>
