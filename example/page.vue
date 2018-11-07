<template>
  <div>
    <h-doc :config="config" :simulator="simulator"></h-doc>
  </div>
</template>

<script>
import Hdoc from '../src/H-Doc';
import config from '../config';
export default {
  data() {
    return {
      config: config,
      simulator: 'http://localhost:8080/mobile.html'
    }
  },
  components: {
    Hdoc
  }
}
</script>

<style>

</style>
