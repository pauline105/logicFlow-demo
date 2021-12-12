<template>
  <div class="container">
    <header>
      <div>
        <div>1</div>
        <div>2</div>
      </div>
    </header>
    <div class="node">
      <el-tabs v-model="activeName" @tab-click="handleClick">
        <el-tab-pane label="元素" name="first">
          <div @mousedown="addNode('startNode')">
            <i class="iconfont icon-kaishi2"></i>
            <span>开始</span>
          </div>
          <div @mousedown="addNode('autoNode')">
            <i class="iconfont icon-lianjiezhuangtai"></i>
            <span>自动节点</span>
          </div>
          <div @mousedown="addNode('assignNode')">
            <i class="iconfont icon-a"></i>
            <span>赋值</span>
          </div>
          <div @mousedown="addNode('cycleNode')">
            <i class="iconfont icon-xunhuan4"></i>
            <span>循环</span>
          </div>
          <div @mousedown="addNode('recordNode')">
            <i class="iconfont icon-jingzhichaxun"></i>
            <span>查询记录</span>
          </div>
          <div @mousedown="addNode('switchNode')">
            <div>
              <i class="iconfont icon-cuowuguanbiquxiao"></i>
            </div>
            <span>排他开关</span>
          </div>
          <div @mousedown="addNode('endNode')">
            <i class="iconfont icon-tongxinyuan"></i>
            <span>结束</span>
          </div>
        </el-tab-pane>
        <el-tab-pane label="资源库" name="second">资源库</el-tab-pane>
      </el-tabs>
      <div></div>
    </div>

    <Control />
    <!-- 画布 -->
    <div id="container" ref="logContainer"></div>
  </div>

  <!-- 节点抽屉 -->
  <el-drawer
    v-model="PropertyReadWrite.drawerStatus.nodeDrawer"
    custom-class="nodeDrawer"
    destroy-on-close
    size="810px"
    title="添加操作"
  >
    <div class="drawer-container">
      <el-tabs v-model="activeName" @tab-click="handleClick">
        <el-tab-pane label="基础设置" name="first">
          <el-form
            class="demo-ruleForm"
            label-width="100px"
            :model="PropertyReadWrite.autoForm"
            :rules="nodeDrawerRules"
          >
            <el-form-item label="节点名称" prop="name">
              <el-input v-model="PropertyReadWrite.autoForm.name" />
            </el-form-item>
            <el-form-item label="事件说明">
              <el-input
                v-model="PropertyReadWrite.autoForm.event"
                resize="none"
                rows="4"
                type="textarea"
              />
            </el-form-item>
            <div>执行人</div>
            <el-form-item label="用户类型" prop="name">
              <el-select v-model="PropertyReadWrite.autoForm.type">
                <el-option value="用户">用户</el-option>
                <el-option value="角色">角色</el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="可选用户" prop="name">
              <el-select v-model="PropertyReadWrite.autoForm.user">
                <option>1</option>
              </el-select>
            </el-form-item>
          </el-form>
        </el-tab-pane>
        <el-tab-pane label="绑定操作" name="second">
          <el-form
            class="demo-ruleForm"
            label-width="100px"
            :model="operationForm"
            :rules="operationRules"
          >
            <el-form-item label="操作类型" prop="name">
              <el-select v-model="operationForm.type">
                <el-option>1</el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="权限设置">
              <el-checkbox
                v-model="operationForm.rights"
                label="校验数据权限"
              />
              <el-tooltip class="item" effect="dark" placement="right">
                <template #content>
                  勾选：将校验数据权限、功能权限、查重规则、校验规则
                  <br />
                  不勾选：将不校验任何权限规则
                </template>
                <i class="iconfont icon-yiwen"></i>
              </el-tooltip>
            </el-form-item>
            <el-radio-group v-model="operationForm.record">
              <el-radio label="创建关联到当前对象的对象记录" />
              <el-radio label="创建与当前对象无关的记录" />
            </el-radio-group>
            <el-form-item label="相关对象" prop="name">
              <el-select v-model="operationForm.relatedObj">
                <el-option>1</el-option>
              </el-select>
              c
            </el-form-item>
            <el-form-item label="业务对象" prop="name">
              <el-select v-model="operationForm.businessObj">
                <el-option>1</el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="业务类型" prop="name">
              <el-select v-model="operationForm.businessType">
                <el-option>1</el-option>
              </el-select>
            </el-form-item>
          </el-form>
        </el-tab-pane>
      </el-tabs>
    </div>
    <div>
      <el-button type="primary" @click="addSaveHandle">保存</el-button>
      <el-button @click="shurDownDrawer('nodeDrawer')">取消</el-button>
    </div>
  </el-drawer>

  <!-- 赋值抽屉 -->
  <el-drawer
    v-model="PropertyReadWrite.drawerStatus.assignDrawer"
    custom-class="assignDrawer"
    destroy-on-close
    size="810px"
    title="赋值设置"
  >
    <div class="drawer-container">
      <el-form
        class="demo-ruleForm"
        label-width="100px"
        :model="PropertyReadWrite.assignDrawerForm"
        :rules="assignRules"
      >
        <el-form-item label="节点名称" prop="name">
          <el-input v-model="PropertyReadWrite.assignDrawerForm.name" />
        </el-form-item>
        <el-form-item label="API名称：" prop="APIname">
          <el-input v-model="PropertyReadWrite.assignDrawerForm.APIname" />
        </el-form-item>
        <el-form-item label="描述:">
          <el-input
            v-model="PropertyReadWrite.assignDrawerForm.describe"
            resize="none"
            rows="4"
            type="textarea"
          />
        </el-form-item>
      </el-form>
      <div>变量赋值</div>
    </div>
    <div>
      <el-button type="primary" @click="assignSaveHandle">保存</el-button>
      <el-button>取消</el-button>
    </div>
  </el-drawer>

  <!-- 循环抽屉 -->
  <el-drawer
    v-model="PropertyReadWrite.drawerStatus.cycleDrawer"
    custom-class="cycleDrawer"
    destroy-on-close
    size="810px"
    title="循环设置"
  >
    <div class="drawer-container">
      <el-form
        class="demo-ruleForm"
        label-width="100px"
        :model="PropertyReadWrite.cycleForm"
        :rules="cycleRules"
      >
        <el-form-item label="节点名称" prop="name">
          <el-input v-model="PropertyReadWrite.cycleForm.name" />
        </el-form-item>
        <el-form-item label="API名称：" prop="APIname">
          <el-input v-model="PropertyReadWrite.cycleForm.APIname" />
        </el-form-item>
        <el-form-item label="描述:">
          <el-input
            v-model="PropertyReadWrite.cycleForm.describe"
            resize="none"
            rows="4"
            type="textarea"
          />
        </el-form-item>
        <div>选择循环数据集</div>
        <el-form-item label="集合变量" prop="name">
          <el-select v-model="PropertyReadWrite.cycleForm.variable">
            <el-option>1</el-option>
          </el-select>
        </el-form-item>
        <div>选择遍历方向</div>
        <el-form-item label="遍历方向" prop="name">
          <el-radio-group v-model="PropertyReadWrite.cycleForm.direction">
            <el-radio label="从第一个item到最后一个item" />
            <el-radio label="从最后一个item到第一个item" />
          </el-radio-group>
        </el-form-item>
        <div>选择循环游标</div>
        <el-form-item label="循环游标" prop="name">
          <el-select v-model="PropertyReadWrite.cycleForm.cursor">
            <el-option>1</el-option>
          </el-select>
        </el-form-item>
        <div>设置循环结束条件</div>
        <el-form-item label="结束条件" prop="name">
          <el-select v-model="PropertyReadWrite.cycleForm.conditions">
            <el-option>1</el-option>
          </el-select>
        </el-form-item>
      </el-form>
    </div>
    <div>
      <el-button type="primary" @click="cycleHandle">保存</el-button>
      <el-button>取消</el-button>
    </div>
  </el-drawer>

  <!-- 记录抽屉 -->
  <el-drawer
    v-model="PropertyReadWrite.drawerStatus.recordDrawer"
    custom-class="recordDrawer"
    destroy-on-close
    size="810px"
    title="查询记录设置"
  >
    <div class="drawer-container">
      <el-scrollbar height="850px">
        <el-form
          class="demo-ruleForm"
          label-width="100px"
          :model="PropertyReadWrite.recordForm"
          :rules="recordRules"
        >
          <el-form-item label="查询记录名称" prop="name">
            <el-input v-model="PropertyReadWrite.recordForm.searchName" />
          </el-form-item>
          <el-form-item label="API名称：" prop="APIname">
            <el-input v-model="PropertyReadWrite.recordForm.APIname" />
          </el-form-item>
          <el-form-item label="描述:">
            <el-input
              v-model="PropertyReadWrite.recordForm.describe"
              resize="none"
              rows="4"
              type="textarea"
            />
          </el-form-item>
          <el-form-item label="权限设置">
            <el-checkbox
              v-model="PropertyReadWrite.recordForm.rights"
              label="权限校验"
            />
          </el-form-item>
          <div>选择查询对象</div>
          <el-form-item label="业务对象" prop="name">
            <el-select v-model="PropertyReadWrite.recordForm.obj">
              <el-option>1</el-option>
            </el-select>
          </el-form-item>
          <div>选择查询条件</div>
          <el-radio-group
            v-model="PropertyReadWrite.recordForm.searchConditions"
          >
            <el-radio label="获取业务对象下的全部记录" />
            <el-radio label="当下列条件满足时" />
          </el-radio-group>
          <div>设置排序规则</div>
          <el-form-item label="排序规则" prop="name">
            <el-select v-model="PropertyReadWrite.recordForm.rules">
              <el-option>1</el-option>
            </el-select>
          </el-form-item>
          <div>设置查询结果获取方式</div>
          <div>
            <span>查询结果获取数量</span>
            <el-radio-group v-model="PropertyReadWrite.recordForm.number">
              <el-radio label="获取第一条记录" />
              <el-radio label="获取所有记录(最多1000条)" />
            </el-radio-group>
            <el-checkbox
              v-model="PropertyReadWrite.recordForm.isNull"
              label="没查询到记录时,将查询结果变量设置为空"
            />
          </div>

          <div>设置查询结果存储变量</div>
          <el-form-item label="排序规则" prop="name">
            <el-select v-model="PropertyReadWrite.recordForm.way">
              <el-option>1</el-option>
            </el-select>
          </el-form-item>
        </el-form>
      </el-scrollbar>
    </div>
    <div>
      <el-button type="primary" @click="recordHandle">保存</el-button>
      <el-button>取消</el-button>
    </div>
  </el-drawer>

  <!-- 排它抽屉 -->
  <el-drawer
    v-model="PropertyReadWrite.drawerStatus.gatewayDrawer"
    custom-class="gatewayDrawer"
    destroy-on-close
    size="810px"
    title="网关"
  >
    <div class="drawer-container">
      <el-form
        class="demo-ruleForm"
        label-width="100px"
        :model="PropertyReadWrite.gatewayForm"
        :rules="gatewayRules"
      >
        <el-form-item label=" 网关名称: " prop="name">
          <el-input v-model="PropertyReadWrite.gatewayForm.gatewayName" />
        </el-form-item>
        <div>
          <p>高级功能</p>

          <div>
            <el-checkbox
              v-model="PropertyReadWrite.gatewayForm.senior"
              label="是否只对条件进行特定的修改时才进入分支"
            />
            <el-tooltip class="item" effect="dark" placement="right-end">
              <template #content>
                一旦选中此选项，则在流程推进到此条件节点后，流程对此条件节点
                <br />
                上所有分支条件（除了Default分支）的判断模式为：
                <br />
                1、先判断记录修改前对当前分支节点下各个分支条件的满足程度；
                <br />
                2、再判断记录修改后对各个分支条件的满足程度；
                <br />
                3、最后判断：流程只会进入记录修改前分支条件的评估结果为
                <br />
                False、修改后为True的分支。
                <br />
                如果所有分支条件都不满足，那么会进入Default分支，
                <br />
                如果有多条分支符合条件，则进入最先创建的分支。
                <br />
              </template>
              <i class="iconfont icon-yiwen"></i>
            </el-tooltip>
          </div>
        </div>
      </el-form>
    </div>
    <div>
      <el-button type="primary" @click="gatewayHandle">保存</el-button>
      <el-button>取消</el-button>
    </div>
  </el-drawer>
</template>

<script>
import { reactive, toRefs, ref, onMounted } from 'vue'
import { WorkArea } from './logicflow/index.js'
import { InputIpc, PropertyReadWrite, CurrentSelectNode } from './ipc.js'
import Control from './logicflow/conponents/Control.vue'
export default {
  components: { Control },
  setup () {
    const logContainer = ref(null)
    onMounted(() => {
      logContainer.value && WorkArea.install(logContainer.value)
    })
    const state = reactive({
      activeName: 'first',
      // 节点抽屉
      nodeDrawer: false,
      // 赋值抽屉
      assignDrawer: false,
      // 循环抽屉
      cycleDrawer: false,
      // 记录抽屉
      recordDrawer: false,
      // 网关抽屉
      gatewayDrawer: false,
      // 节点抽屉表单规则
      nodeDrawerRules: {
        name: [
          { required: true, message: '请输入活动名称', trigger: 'blur' }
        ]
      },
      // 节点绑定页规则
      operationRules: {
        name: [
          { required: true, message: '请输入活动名称', trigger: 'blur' }
        ]
      },

      // 节点绑定页数据
      operationForm: {
        event: '',
        rights: false,
        relatedObj: '',
        businessObj: '',
        businessType: ''
      },
      // 赋值节点抽屉表单规则
      assignRules: {
        name: [
          { required: true, message: '请输入节点名称', trigger: 'blur' }
        ],
        APIname: [
          { required: true, message: '请输入API名称', trigger: 'blur' }
        ]
      },

      // 循环节点抽屉表单规则
      cycleRules: {
        name: [
          { required: true, message: '请输入节点名称', trigger: 'blur' }
        ],
        APIname: [
          { required: true, message: '请输入API名称', trigger: 'blur' }
        ]
      },

      // 记录节点抽屉表单规则
      recordRules: {
        name: [
          { required: true, message: '请输入节点名称', trigger: 'blur' }
        ],
        APIname: [
          { required: true, message: '请输入API名称', trigger: 'blur' }
        ]
      },

      // 记录节点抽屉表单规则
      gatewayRules: {
        name: [
          { required: true, message: '请输入网关名称', trigger: 'blur' }
        ],
        APIname: [
          { required: true, message: '请输入API名称', trigger: 'blur' }
        ]
      }
    })
    // 添加操作保存事件
    const addSaveHandle = () => {
      WorkArea.lf.setProperties(CurrentSelectNode.nodeData.id, {
        form: PropertyReadWrite.autoForm
      })
    }
    // 赋值弹窗保存事件
    const assignSaveHandle = () => {
      WorkArea.lf.setProperties(CurrentSelectNode.nodeData.id, {
        form: PropertyReadWrite.assignDrawerForm
      })
    }
    // 循环弹窗保存事件
    const cycleHandle = () => {
      WorkArea.lf.setProperties(CurrentSelectNode.nodeData.id, {
        form: PropertyReadWrite.cycleForm
      })
    }
    // 查询记录保存事件
    const recordHandle = () => {
      WorkArea.lf.setProperties(CurrentSelectNode.nodeData.id, {
        form: PropertyReadWrite.recordForm
      })
    }
    // 排它保存事件
    const gatewayHandle = () => {
      WorkArea.lf.setProperties(CurrentSelectNode.nodeData.id, {
        form: PropertyReadWrite.gatewayForm
      })
    }
    // 点击取消关闭弹窗
    const shurDownDrawer = () => {
      Object.keys(PropertyReadWrite.drawerStatus).forEach((item) => {
        PropertyReadWrite.drawerStatus[item] = false
      })
    }
    // 拖动生成节点
    const addNode = (type) => {
      WorkArea.lf.dnd.startDrag({
        type
      })
    }
    return {
      ...toRefs(state),
      logContainer,
      PropertyReadWrite,
      InputIpc,
      addNode,
      addSaveHandle,
      shurDownDrawer,
      assignSaveHandle,
      cycleHandle,
      recordHandle,
      gatewayHandle
    }
  }
}
</script>

<style scoped lang="scss">
  .container {
    height: calc(100vh - 166px);
    header {
      > div {
        height: 56px;
        background-color: pink;
        display: flex;
        justify-content: space-between;
        align-items: center;
      }
    }
    .node {
      -moz-user-select: none;

      -webkit-user-select: none;

      user-select: none;
      position: absolute;
      top: 72px;
      left: 16px;
      border: 1px solid #ccc;
      height: 735px;
      width: 186px;
      box-shadow: 0 1px 4px 0 rgb(24 36 55 / 3%), 0 2px 8px 0 rgb(24 36 55 / 4%);
      border-radius: 8px;
      font-size: 12px;
      z-index: 10;
      background-color: #fff;
      .el-tabs {
        padding-left: 18px;
        .el-tabs__header {
          .el-tabs__nav-wrap::after {
            height: 0 !important;
          }
        }
        .el-tabs__content {
          #pane-first {
            > div {
              cursor: pointer;
              display: flex;
              align-items: center;
              font-size: 12px;
              color: #6a7280;
              margin: 8px 0 16px 8px;
              height: 40px;
              i {
                font-size: 18px;
                border-radius: 8px;
                display: flex;
                align-items: center;
                justify-content: center;
                color: #fff;
                width: 33px;
                height: 33px;
                background-color: #4e80f5;
              }
              span {
                margin-left: 24px;
              }
            }
            > div:nth-child(1) {
              i {
                background-color: #00bd65;
              }
            }
            > div:nth-child(6) {
              i {
                background-color: #fa6934 !important;
              }
            }
            > div:nth-child(7) {
              i {
                border-radius: 50%;
                background-color: #95979b;
              }
            }
          }
        }
      }
    }

    #container {
      width: 100%;
      height: 3600px;
    }
  }
</style>
<style lang="scss">
  .nodeDrawer {
    .el-drawer__header {
      border-bottom: 1px solid #eee;
      padding: 0;
      margin: 0;
      > span {
        height: 50px;
        font-size: 16px;
        color: #27292e;
        font-weight: 700;
        line-height: 50px;
        text-indent: 1rem;
      }
    }
    .el-drawer__body {
      position: relative;
      padding: 10px;
      .el-tabs {
        #pane-first {
          .el-form {
            border-bottom: 1px solid #ddd;
            .el-form-item {
              .el-form-item__content {
                .el-input,
                .el-textarea {
                  width: 340px;
                }
              }
            }
            > div:nth-child(3) {
              font-size: 16px;
              font-weight: bold;
              margin: 0 0 16px 30px;
            }
          }
          > div:nth-child(2) {
            margin-top: 20px;
            margin-bottom: 20px;
            margin-left: 20px;
          }
          > div:nth-child(3) {
            margin-left: 20px;
          }
        }
        #pane-second {
          .el-form {
            border-bottom: 1px solid #ddd;
            .el-form-item {
              .el-form-item__content {
                display: flex;
                align-items: center;
                .el-checkbox {
                  height: 40px;
                }
                .el-input,
                .el-textarea {
                  width: 340px;
                }
              }
            }
            > div:nth-child(2) {
              .el-form-item__content {
                i {
                  margin-left: 16px;
                }
              }
            }
            > div:nth-child(3) {
              display: flex;
              flex-direction: column;
              padding-left: 24px;
              margin-bottom: 14px;
            }
          }
          > p:nth-child(2) {
            padding-left: 20px;
          }
          > div:nth-child(3) {
            padding-left: 20px;
          }
        }
      }
      > div:nth-child(2) {
        border-top: 1px solid #ddd;
        width: 100%;
        padding-top: 10px;
        position: absolute;
        bottom: 16px;
        left: 20px;
      }
    }
  }

  .assignDrawer,
  .cycleDrawer,
  .recordDrawer,
  .gatewayDrawer {
    .el-drawer__header {
      border-bottom: 1px solid #eee;
      padding: 0;
      margin: 0;
      > span {
        height: 50px;
        font-size: 16px;
        color: #27292e;
        font-weight: 700;
        line-height: 50px;
        text-indent: 1rem;
      }
    }
    .el-drawer__body {
      position: relative;
      padding: 10px 0;
      .drawer-container {
        .el-form {
          padding: 10px 16px;

          border-bottom: 1px solid #ddd;
          .el-form-item {
            .el-form-item__label {
              display: inline;
              text-align: left;
            }
            .el-form-item__content {
              .el-input,
              .el-textarea {
                width: 340px;
              }
            }
          }
        }
        > div:nth-child(2) {
          padding-left: 16px;
          margin-bottom: 20px;
          background-color: #f3f3f3;
        }
        > div:nth-child(3) {
          padding-left: 16px;
        }
      }

      > div:nth-child(2) {
        border-top: 1px solid #ddd;
        width: 100%;
        padding-top: 10px;
        position: absolute;
        bottom: 8px;
        left: 0px;
        margin: 0;
        padding-left: 12px;
        background-color: #fff;
      }
    }
  }
  .cycleDrawer {
    .el-drawer__body {
      .el-form {
        padding: 0 !important;
        border-bottom: 0 !important;
        .el-form-item {
          padding: 0 16px;
        }
        > div:nth-child(4),
        > div:nth-child(6),
        > div:nth-child(8),
        > div:nth-child(10) {
          padding-left: 16px;
          margin-bottom: 16px;
          background-color: #f3f3f3;
        }

        > div:nth-child(7) {
          .el-form-item__content {
            .el-radio-group {
              display: flex;
              flex-direction: column;
            }
          }
        }
      }
    }
  }
  .recordDrawer {
    .el-drawer__body {
      padding: 0;
      border-bottom: 0;
      .el-form {
        padding: 10px 0 !important;
        border-bottom: 0 !important;
        .el-form-item {
          padding: 0 16px;
        }
        > div:nth-child(5),
        > div:nth-child(7),
        > div:nth-child(9),
        > div:nth-child(11),
        > div:nth-child(13) {
          padding-left: 16px;
          margin-bottom: 16px;
          background-color: #f3f3f3;
        }
        > div:nth-child(8) {
          display: flex;
          flex-direction: column;
          padding-left: 16px;
          padding-bottom: 10px;
        }
        > div:nth-child(12) {
          color: #525252;
          .el-radio-group {
            display: flex;
            flex-direction: column;
          }

          padding-left: 16px;
          padding-bottom: 10px;
        }
      }
    }
  }
  .gatewayDrawer {
    .el-drawer__body {
      padding: 0;
      .el-form {
        border-bottom: 0 !important;
        > div:nth-child(2) {
          padding-left: 16px;
          > div {
            display: flex;
            align-items: center;
            i {
              margin-left: 16px;
            }
          }
        }
      }
    }
  }
</style>
