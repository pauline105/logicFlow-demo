import LogicFlow from '@logicflow/core'
import '@logicflow/core/dist/style/index.css'
import { InputIpc, CurrentSelectNode, PropertyReadWrite } from '../ipc'
import NodeArr from './node'
import { ElMessage } from 'element-plus'
import { Snapshot } from '@logicflow/extension'
// import nodeStyle from './css/index.css'
LogicFlow.use(Snapshot)
/**
 * 工作区
 * */
export class WorkArea {
  static lf = null
  /**
   * 工作区安装
   * @param { HTMLDivElement } target - 安装目标
   * */
  static install (target) {
    WorkArea.lf = new LogicFlow({
      background: {
        color: '#F5F6FA'
      },
      container: target,
      stopScrollGraph: true,
      stopZoomGraph: true,
      grid: {
        type: 'mesh',
        size: '20'
      }
    })
    WorkArea.injection()
    // 节点双击事件
    WorkArea.lf.on('node:dbclick', handleNodeClick)
    // 边双击事件
    WorkArea.lf.on('edge:dbclick', handleEdgeClick)
    // 节点单击事件
    WorkArea.lf.on('node:click', nodeClick)
    // 节点拖拽事件
    WorkArea.lf.on('node:dnd-add', nodeName)
    WorkArea.lf.render(WorkArea.bag)
    WorkArea.installNodeStyle()
  }

  /**
   * 注入自定义节点
   * */
  static injection () {
    Object.values(NodeArr).forEach((item) => {
      WorkArea.lf.register({
        type: item.type,
        view: item.view,
        model: item.model
      })
    })
  }

  /**
   * 安装自定义节点样式
   * */
  // static installNodeStyle () {
  //   const style = document.createElement('style')
  //   style.innerText = nodeStyle.replace(/\ +/g, '').replace(/[\r\n]/g, '')
  //   const drag = WorkArea.lf.container.querySelector('.lf-drag-able')
  //   drag && drag.appendChild(style)
  // }

  /** 节点数据 */
  static bag = {
    // 节点
    nodes: []
  }
}

/**
 * 边双击事件处理
 * */
function handleEdgeClick (eventObject) {
  const {
    data,
    data: { type, properties }
  } = eventObject
  const nodeModel = WorkArea.lf.getNodeModel(data.sourceNodeId)
  if (nodeModel.type === 'switchNode') {
    PropertyReadWrite.drawerStatus.lineAttr = true
  }
}

/**
 *
 *节点单击事件处理
 **/
const nodeClick = (eventObject) => {
  const {
    data,
    data: { type, properties }
  } = eventObject
  CurrentSelectNode.nodeModel = data
  console.log(CurrentSelectNode.nodeModel)
}

/**
 * 节点双击事件处理
 * */
function handleNodeClick (eventObject) {
  const {
    data,
    data: { type, properties }
  } = eventObject
  console.log(data)
  console.log(properties)
  if (type === 'startNode' || type === 'endNode') {
    return
  }

  // 自动节点事件
  if (type === 'autoNode') {
    // 点击弹出层
    // 获取节点id
    CurrentSelectNode.nodeData = data
    PropertyReadWrite.autoForm = data.properties.form
    if (!Object.keys(properties).length) {
      InputIpc.handleInput()
    }
    PropertyReadWrite.drawerStatus.nodeDrawer = true
  }
  // 赋值事件
  if (type === 'assignNode') {
    // 点击弹出层
    // 获取节点id
    CurrentSelectNode.nodeData = data
    PropertyReadWrite.assignDrawerForm = data.properties.form
    if (!Object.keys(properties).length) {
      InputIpc.assignHandle()
    }
    PropertyReadWrite.drawerStatus.assignDrawer = true
  }
  // 循环事件
  if (type === 'cycleNode') {
    // 点击弹出层
    // 获取节点id
    CurrentSelectNode.nodeData = data
    PropertyReadWrite.cycleForm = data.properties.form
    if (!Object.keys(properties).length) {
      InputIpc.cycleHandle()
    }
    PropertyReadWrite.drawerStatus.cycleDrawer = true
  }
  // 查询记录事件
  if (type === 'recordNode') {
    // 点击弹出层
    // 获取节点id
    CurrentSelectNode.nodeData = data
    PropertyReadWrite.recordForm = data.properties.form
    if (!Object.keys(properties).length) {
      InputIpc.recordHandle()
    }
    PropertyReadWrite.drawerStatus.recordDrawer = true
  }
  // 排它开关事件
  if (type === 'switchNode') {
    // 点击弹出层
    // 获取节点id
    CurrentSelectNode.nodeData = data
    PropertyReadWrite.gatewayForm = data.properties.form
    if (!Object.keys(properties).length) {
      InputIpc.gatewayHandle()
    }
    PropertyReadWrite.drawerStatus.gatewayDrawer = true
  }
}
/**
 * 节点拖拽生成节点名事件
 **/
const nodeName = (eventObject) => {
  // 获取全部数据
  const { nodes } = WorkArea.lf.getGraphData()
  // 判断类型 赋值节点名
  const typeNumber = (type) => {
    const typeList = nodes.filter((item) => {
      return item.type === type
    })
    return typeList
  }

  const {
    data,
    data: { type, properties }
  } = eventObject
  console.log(type)
  // 判断是否有开始节点
  if (typeNumber('startNode').length >= 2) {
    WorkArea.lf.deleteNode(typeNumber('startNode')[1].id)
    return ElMessage.error('只能有一个开始节点')
  }
  // 拖拽出给每个节点赋值name属性
  switch (type) {
    case 'autoNode':
      WorkArea.lf.setProperties(data.id, {
        form: {
          name: `自动节点${typeNumber(type).length}`
        }
      })
      break
    case 'assignNode':
      WorkArea.lf.setProperties(data.id, {
        form: {
          name: '赋值' + typeNumber(type).length
        }
      })
      break
    case 'recordNode':
      WorkArea.lf.setProperties(data.id, {
        form: {
          searchName: `查询记录${typeNumber(type).length}`
        }
      })
      break
    case 'switchNode':
      WorkArea.lf.setProperties(data.id, {
        form: {
          gatewayName: `排他开关${typeNumber(type).length}`
        }
      })
      break
  }
}
