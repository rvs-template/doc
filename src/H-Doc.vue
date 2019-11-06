<template>
  <div class="h-doc">
    <h-doc-header
      :config="config.header"
      :search-config="searchConfig"
    >
    </h-doc-header>
    <h-doc-nav :nav-config="config.nav" :base="base"></h-doc-nav>
    <h-doc-container :has-simulator="!!(simulator || simulators.length)">
      <h-doc-content>
        <slot></slot>
        <h-doc-footer-nav :nav-config="config.nav" :base="base" />
      </h-doc-content>
    </h-doc-container>
    <h-doc-simulator :src="simulator"></h-doc-simulator>
    <!-- <h-doc-footer></h-doc-footer> -->
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
    searchConfig: Object,
    simulator: String,
    simulators: {
      type: Array,
      default: () => []
    },
    base: {
      type: String,
      default: ''
    }
  }
};
</script>

<style>

</style>
