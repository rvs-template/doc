<template>
  <div>
    <h-doc :config="config"></h-doc>
  </div>
</template>

<script>
import Hdoc from '../src/H-Doc';
import config from '../config';
export default {
  data() {
    return {
      config: config
    }
  },
  components: {
    Hdoc
  }
}
</script>

<style>

</style>
