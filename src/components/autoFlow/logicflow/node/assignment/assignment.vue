<template>
  <div class="assign-node">
    <i class="iconfont icon-a"></i>
    <span>{{ form.name }}</span>
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
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;

    i {
      font-size: 28px;
      border-radius: 8px;
      display: flex;
      align-items: center;
      justify-content: center;
      color: #fff;
      width: 55px;
      height: 55px;
      background-color: #4e80f5;
    }
    span {
      font-size: 14px;
    }
  }
</style>
