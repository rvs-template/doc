<template>
  <div class="h-doc-footer">
    <div class="h-doc-footer-bottom">Made with <span class="h-doc-footer-heart">❤</span> by Billow</div>
  </div>
</template>

<script>
export default {
  name: 'h-footer'
}
</script>

<style lang="less">
  .h-doc-footer {
    &-bottom {
      position: absolute;
      bottom: 0;
      width: 100%;
      text-align: center;
    }
    &-heart {
      font-size: 20px;
      color: rgba(161, 28, 28, 0.678)
    }
  }
</style>
