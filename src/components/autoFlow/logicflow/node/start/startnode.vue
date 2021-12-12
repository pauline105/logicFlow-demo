<template>
  <div class="my-node">
    <i class="iconfont icon-kaishi2"></i>
    <span>开始</span>
  </div>
</template>

<script>
export default {}
</script>

<style lang="scss" scoped>
  .my-node {
    box-sizing: border-box;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    width: 108px;
    height: 68px;
    padding: 10px 0;
    background: #00b532;
    border-radius: 34px;
    i {
      font-size: 24px;
      color: #fff;
    }
    span {
      margin-top: 4px;
      font-size: 14px;
      color: #f3f3f3;
    }
  }
</style>
