/**
 * @file 用户节点
 * */
import { createApp } from 'vue'
import switchNode from './switch.vue'
import { HtmlNode, HtmlNodeModel } from '@logicflow/core'

export const SwitchType = 'switchNode'

export class SwitchNodeModel extends HtmlNodeModel {
  setAttributes () {
    this.text.editable = false
    const width = 72
    const height = 72
    this.width = width
    this.height = height
    this.anchorsOffset = [
      [width / 2, 0],
      [0, height / 2],
      [-width / 2, 0],
      [0, -height / 2]
    ]
  }
}

export class SwitchNodeView extends HtmlNode {
  shouldUpdate () {
    const { properties } = this.getAttributes()
    if (
      this.currrentProperties &&
      this.currrentProperties === JSON.stringify(properties)
    ) {
      return false
    }
    this.currrentProperties = JSON.stringify(properties)
    return true
  }

  setHtml (rootEl) {
    const { properties } = this.getAttributes()
    const { form } = properties
    if (!this.shouldUpdate()) return
    const el = document.createElement('div')
    rootEl.innerHTML = ''
    rootEl.appendChild(el)
    createApp(switchNode, { form }).mount(el)
  }
}
