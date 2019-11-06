<template>
  <input class="h-search-input" placeholder="搜索文档..." />
</template>

<script>
export default {
  name: 'h-search-input',
  props: {
    searchConfig: Object
  },
  mounted() {
    if (this.searchConfig) {
      this.docSearchInstance = window.docsearch({
        ...this.searchConfig,
        inputSelector: '.h-search-input'
      });
    }
  }
}
</script>

<style lang="less">
@import "../style/var.less";

  .h-search-input {
    width: 200px;
    height: 60px;
    margin-left: 60px;
    padding-left: 5px;
    font-size: 14px;
    background-color: transparent;
    border: none;
    &:focus {
      outline: none;
    }
    &::placeholder {
      opacity: 0.7;
    }
  }

.ds-dropdown-menu {
  line-height: 1.8;
}

.algolia-autocomplete {
  .algolia-docsearch-suggestion--highlight {
    color: @h-doc-green;
    background-color: transparent;
  }
  .algolia-docsearch-suggestion--title {
    font-weight: 500;
  }
  .algolia-docsearch-suggestion--text {
    .algolia-docsearch-suggestion--highlight {
      box-shadow: inset 0 -1px 0 0 @h-doc-green
    }
  }
  .algolia-docsearch-suggestion--category-header {
    border-bottom-color: @h-doc-dark-grey;
  }
  .ds-dropdown-menu [class^='ds-dataset-'] {
    border: none;
  }
  .ds-dropdown-menu {
    top: 80% !important;
    box-shadow: 0 4px 12px @h-doc-light-grey;
    &::before {
      display: none;
    }
  }
}
</style>