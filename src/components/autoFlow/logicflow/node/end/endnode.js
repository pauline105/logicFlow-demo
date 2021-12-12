/**
 * @file 用户节点
 * */
import { createApp } from 'vue'
import EndNode from './endnode.vue'
import { HtmlNode, HtmlNodeModel } from '@logicflow/core'

export const EndType = 'endNode'

export class EndNodeModel extends HtmlNodeModel {
  setAttributes () {
    this.text.editable = false
    const width = 108
    const height = 68
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

export class EndNodeView extends HtmlNode {
  shouldUpdate () {
    const { properties } = this.getAttributes()
    if (
      this.currrentProperties &&
      this.currrentProperties === JSON.stringify(properties)
    ) { return false }
    this.currrentProperties = JSON.stringify(properties)
    return true
  }

  setHtml (rootEl) {
    const { properties } = this.getAttributes()
    const { name } = properties
    if (!this.shouldUpdate()) return
    const el = document.createElement('div')
    rootEl.innerHTML = ''
    rootEl.appendChild(el)
    createApp(EndNode, { name }).mount(el)
  }
}
