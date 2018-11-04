<template>
  <div class="h-doc-demo-section" :class="`demo-${demoName}`" :style="style">
    <slot></slot>
  </div>
</template>

<script>
export default {
  name: 'demo-section',
  props: {
    title: String,
    name: String,
    background: String
  },
  computed: {
    demoName() {
      return this.name || this.getParentName()
    },
    style() {
      return {
        background: this.background
      }
    }
  },
  methods: {
    getParentName() {
      const { $parent } = this;
      if ($parent && $parent.$options.name) {
        return $parent.$options.name.replace('demo-', '');
      }
    }
  }
}
</script>

<style lang="less">
 .h-doc-demo-section {
  min-height: 100vh;
  padding-bottom: 20px;
  box-sizing: border-box;
  &__title {
    margin: 0;
    padding: 15px;
    font-size: 16px;
    line-height: 1.5;
    font-weight: normal;
    text-transform: capitalize;
    + .h-doc-demo-block {
      .h-doc-demo-block__title {
        padding-top: 0;
      }
    }
  }
 }
</style>
