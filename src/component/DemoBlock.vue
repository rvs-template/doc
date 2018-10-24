<template>
  <section class="demo-block">
    <h2>{{ title }}</h2>
    <slot />
  </section>
</template>

<script>
export default {
  name: 'demo-block',
  props: {
    title: String
  }
}
</script>

<style lang="less">
  @import '../style/var.less';
  .demo-block {
    padding: 0 15px;
    &__title {
      margin: 0;
      font-weight: normal;
      font-size: 14px;
      color: @h-doc-text-light-blue;
      padding: 40px 15px 15px;
    }
  }
</style>
