import LogicFlow from '@logicflow/core'
import '@logicflow/core/dist/style/index.css'
import { InputIpc, CurrentSelectNode, PropertyReadWrite } from '../ipc'
import NodeArr from './node'
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
    WorkArea.lf.on('node:dbclick', handleNodeClick)
    WorkArea.lf.render(WorkArea.bag)
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

  /** 节点数据 */
  static bag = {
    // 节点
    nodes: []
  }
}

/**
 * 节点单击事件处理
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
    if (!Object.keys(properties).length) {
      InputIpc.gatewayHandle()
    }
    PropertyReadWrite.drawerStatus.gatewayDrawer = true
  }
}
