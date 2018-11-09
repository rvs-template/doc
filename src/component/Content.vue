<template>
  <div :class="['h-doc-content', `h-doc-content--${currentPage}`]">
    <slot />
  </div>
</template>

<script>
export default {
  name: 'h-doc-content',
  computed: {
    currentPage() {
      const { path } = this.$route;
      if (path) {
        return path.split('/').slice(-1)[0];
      }
      return this.$route.name;
    }
  }
};
</script>

<style lang="less">
  @import '../style/var.less';
  .h-doc-content {
    position: relative;
    padding: 0 0 75px;
    section {
      padding: 10px @h-doc-padding;
      overflow: hidden;
      > h1,
      > h2,
      > h3,
      > h4,
      > h5,
      > h6 {
        line-height: 1.5;
        font-weight: normal;
        margin: 20px 0 10px;
        color: @h-doc-black;
      }

      > h1 {
        font-size: 36px;
      }
      > h2 {
        font-size: 30px;
        margin-bottom: 25px;
      }
      > h3 {
        font-size: 22px;
        margin-top: 45px;
      }
      > h2 + h3 {
        margin-top: 25px;
      }
      > h4 {
        font-size: 16px;
        margin-bottom: 15px;
      }
      > h5 {
        font-size: 14px
      }
      > h6 {
        font-size: 14px;
        color: @h-doc-dark-grey;
      }

      > p {
        margin: 15px 0;
        font-size: 14px;
        line-height: 26px;
        color: @h-doc-text-color;
      }
      > ul,
      > ol {
        padding: 15px 0;
        background-color: @h-doc-code-background-color;
      }

      > ul li,
      > ol li {
        color: @h-doc-text-color;
        font-size: 14px;
        line-height: 22px;
        margin: 5px 0 5px 20px;
        padding-left: 15px;
        position: relative;
        &::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          width: 6px;
          height: 6px;
          margin-top: 8px;
          border-radius: 50%;
          box-sizing: border-box;
          border: 1px solid @h-doc-dark-grey;
        }
        li {
          margin-left: 0;
        }
      }

      > hr {
        border: 0px none;
        border-top: 1px solid #eee;
      }
      p > code,
      li > code,
      table code {
        margin: 2px;
        padding: 2px 7px;
        display: inline;
      }
    }

    blockquote {
      padding: 16px;
      margin: 20px 0;
      font-size: 14px;
      border-radius: 4px;
      background-color: #ecf9ff;
      color: rgba(52, 73, 94, .8);
      border-left: 5px solid #50bfff;
    }
    table {
      width: 100%;
      font-size: 13px;
      line-height: 1.5;
      margin-bottom: 45px;
      background-color: #fff;
      border-collapse: collapse;
      color: @h-doc-text-color;
      th {
        padding: 8px 10px;
        text-align: left;
        font-weight: normal;
        background-color: @h-doc-code-background-color;
        &:first-child {
          padding-left: 10px;
        }
      }
      td {
        padding: 8px;
        border-bottom: 1px solid @h-doc-code-background-color;
      }
      code {
        font-size: 13px;
        padding: 0 8px;
        font-family: inherit;
        word-break: keep-all;
      }
    }
  }
</style>
