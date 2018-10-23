<template>
  <section class="demo-block">
    <h2>{{ title }}</h2>
    <slot />
  </section>
</template>

<script>
export default {
  props: {
    title: String
  }
}
</script>

<style lang="less">
  .demo-block {
    padding: 0 15px;
    &__title {
      margin: 0;
      font-weight: normal;
      font-size: 14px;
      color: @van-doc-text-light-blue;
      padding: 40px 15px 15px;
    }
  }
</style>
