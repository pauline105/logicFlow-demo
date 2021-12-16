<template>
  <div class="assign-node">
    <div>
      <i class="iconfont icon-cuowuguanbiquxiao"></i>
    </div>
    <span>{{ form.gatewayName }}</span>
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
  .assign-node {
    position: relative;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    > div {
      margin-top: 8px;
      transform: rotate(45deg);
      border-radius: 8px;
      display: flex;
      align-items: center;
      justify-content: center;
      color: #fff;
      width: 55px;
      height: 55px;
      background-color: #fa6934;
      i {
        transform: rotate(45deg);
        font-size: 28px;
      }
    }

    span {
      position: absolute;
      top: 67px;
      left: 8px;
      margin: 0;
      font-size: 12px;
      z-index: 99;
    }
  }
</style>
