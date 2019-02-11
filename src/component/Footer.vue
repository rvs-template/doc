<template>
  <footer class="h-doc-footer" :style="style">
    <div class="container">
      <div class="footer-main">
        <h4>title</h4>
        <a href="https://github.com" class="footer-main-link" target="_blank">repo</a>
        <a href="https://github.com" class="footer-main-link" target="_blank">changelog</a>
        <a href="https://github.com" class="footer-main-link" target="_blank">faq</a>
        <a href="https://github.com" class="footer-main-link" target="_blank">starter</a>
        <a href="https://github.com" class="footer-main-link" target="_blank">theme</a>
        <a href="https://github.com" class="footer-main-link" target="_blank">preview</a>
      </div>
      <div class="footer-main">
        <h4>title</h4>
        <a href="gitterLink" class="footer-main-link" target="_blank">gitter</a>
        <a href="https://github.com" class="footer-main-link" target="_blank">feedback</a>
        <a href="`https://github.com" class="footer-main-link" target="_blank">contribution</a>
        <a href="https://segmentfault.com" class="footer-main-link" target="_blank">SegmentFault</a>
        <a href="https://github.com" class="footer-main-link" target="_blank">Awesome</a>
      </div>
      <div class="footer-social">
        <i class="doc-icon-weixin" v-popover:weixin></i>
        <a href="https://github.com" target="_blank">
          <i class="doc-icon-github "></i>
        </a>
        <a href="gitterLink" target="_blank">
          <i class="doc-icon-gitter"></i>
        </a>
      </div>
    </div>
  </footer>
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
