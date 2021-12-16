import { ref, reactive } from 'vue'
import { WorkArea } from './logicflow'
export class InputIpc {
  // 自动节点事件
  static handleInput() {
    if (CurrentSelectNode.nodeData) {
      // 通过节点id 设置name属性值
      WorkArea.lf.setProperties(CurrentSelectNode.nodeData.id, {
        form: { event: '', type: '', user: '' },
      })
    }
  }
  // 赋值节点事件
  static assignHandle() {
    if (CurrentSelectNode.nodeData) {
      // 通过节点id 设置name属性值
      WorkArea.lf.setProperties(CurrentSelectNode.nodeData.id, {
        form: { name: '', APIname: '', describe: '' },
      })
    }
  }
  // 循环节点事件
  static cycleHandle() {
    if (CurrentSelectNode.nodeData) {
      // 通过节点id 设置name属性值
      WorkArea.lf.setProperties(CurrentSelectNode.nodeData.id, {
        form: {
          name: '',
          APIname: '',
          describe: '',
          variable: '',
          direction: '',
          cursor: '',
          conditions: '',
        },
      })
    }
  }
  // 查询记录事件
  static recordHandle() {
    if (CurrentSelectNode.nodeData) {
      // 通过节点id 设置name属性值
      WorkArea.lf.setProperties(CurrentSelectNode.nodeData.id, {
        form: {
          searchName: '',
          APIname: '',
          describe: '',
          rights: false,
          obj: '',
          searchConditions: '',
          rules: '',
          way: '',
          number: '',
          isNull: false,
        },
      })
    }
  }
  // 排它事件
  static gatewayHandle() {
    if (CurrentSelectNode.nodeData) {
      // 通过节点id 设置name属性值
      WorkArea.lf.setProperties(CurrentSelectNode.nodeData.id, {
        form: {
          gatewayName: '',
          senior: false,
        },
      })
    }
  }
}

export class CurrentSelectNode {
  static nodeData
}

export class PropertyReadWrite {
  // 当前点击的节点信息
  nodeModel = {}

  static drawerStatus = reactive({
    nodeDrawer: false,
    assignDrawer: false,
    cycleDrawer: false,
    recordDrawer: false,
    gatewayDrawer: false,
    lineAttr: false,
  })

  static option = ref({})

  // 自动节点数据
  static autoForm = reactive({
    name: '',
    event: '',
    type: '',
    user: '',
  })
  // 赋值节点抽屉表单数据
  static assignDrawerForm = reactive({
    name: '',
    APIname: '',
    describe: '',
  })

  // 循环节点
  static cycleForm = reactive({
    name: '',
    APIname: '',
    describe: '',
    variable: '',
    // 方向
    direction: '',
    cursor: '',
    conditions: '',
  })
  // 查询记录节点
  static recordForm = reactive({
    searchName: '',
    APIname: '',
    describe: '',
    rights: false,
    obj: '',
    searchConditions: '',
    rules: '',
    way: '',
    number: '',
    isNull: false,
  })
  // 排它节点
  static gatewayForm = reactive({
    gatewayName: '',
    senior: false,
  })

  // 排它网关连线属性
  static lineAttrForm = reactive({
    type: '条件分支',
    name: '',
  })
  /**
   * 属性读写显示
   * @param { Object } option - 对话框 props
   * @param { Function } callback - 显示回调
   * */

  /**
   * 属性读写隐藏
   * @param { Function } callback - 隐藏回调
   * */
}
