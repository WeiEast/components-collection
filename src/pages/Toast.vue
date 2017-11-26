<template>
  <div>
    <span class="ui-toast">Toast</span>
  </div>
</template>
<script>
//  import Toast from '@packages/components/Toast/Toast.js';
  import Toast from '../../dist/components/Toast/Toast.js';
  export default {
    created: function () {
      Toast();
    }
  }
</script>
<style scoped>
</style>
