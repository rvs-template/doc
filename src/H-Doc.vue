<template>
  <div class="h-doc">
    <h-doc-header :config="config.header"></h-doc-header>
    <h-doc-nav :nav-config="config.nav" :base="base"></h-doc-nav>
    <h-doc-container>
      <h-doc-content>
        <slot></slot>
      </h-doc-content>
      <!-- <h-doc-footer-nav /> -->
    </h-doc-container>
    <h-doc-simulator src="mobile.html"></h-doc-simulator>
  </div>
</template>

<script>
export default {
  name: 'h-doc',
  props: {
    config: {
      type: Object,
      required: true
    },
    simulators: {
      type: Array,
      default: () => []
    },
    base: {
      type: String,
      default: ''
    }
  }
}
</script>

<style>

</style>
