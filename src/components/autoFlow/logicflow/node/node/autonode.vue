<template>
  <div class="auto-node">
    <div>
      <i class="iconfont icon-lianjiezhuangtai"></i>
    </div>
    <div>{{ form.name }}</div>
  </div>
</template>

<script>
export default {
  props: {
    form: {
      type: Object,
      default: () => {
        return {}
      }
    }
  }
}
</script>

<style lang="scss" scoped>
  .auto-node {
    box-sizing: border-box;
    width: 122px;
    height: 82px;
    background-color: #fff;
    border: 2px solid #a1bbf7;

    & > div:nth-child(1) {
      padding-left: 8px;
      display: flex;
      align-items: center;
      height: 32px;
      background-color: #1d77ff;
      i {
        color: #fff;
      }
    }
    & > div:nth-child(2) {
      background-color: #fff;
      height: 46px;
      padding: 6px;
      color: #525252;
    }
  }
</style>
