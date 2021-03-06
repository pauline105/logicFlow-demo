/**
 * @file 用户节点
 * */
import { createApp } from 'vue'
import autoNode from './autonode.vue'
import { HtmlNode, HtmlNodeModel } from '@logicflow/core'

export const AutoType = 'autoNode'

export class AutoNodeModel extends HtmlNodeModel {
  setAttributes () {
    this.text.editable = false
    const width = 122
    const height = 82
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

export class AutoNodeView extends HtmlNode {
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
    const { form } = properties
    if (!this.shouldUpdate()) return
    const el = document.createElement('div')
    rootEl.innerHTML = ''
    rootEl.appendChild(el)
    createApp(autoNode, { form }).mount(el)
  }
}
