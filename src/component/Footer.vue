<template>
  <div class="h-doc-footer" :style="style">
    <div class="h-doc-footer-bottom">Made with <span class="h-doc-footer-heart">❤</span> by Billow</div>
  </div>
</template>

<script>
export default {
  name: 'h-doc-footer',
  computed: {
    style() {
      return {
        'bottom':  -window.innerHeight + 'px'
      };
    }
  }
};
</script>

<style lang="less">
  .h-doc-footer {
    position: absolute;
    width: 100%;
    text-align: center;
    &-bottom {
      width: 100%;
    }
    &-heart {
      font-size: 20px;
      color: rgba(161, 28, 28, 0.678)
    }
  }
</style>
