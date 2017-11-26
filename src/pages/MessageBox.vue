<template>
    <div>
      <span class="ui-messagebox">MessageBox</span>
    </div>
</template>
<script>
  import MessageBox from '@packages/components/MessageBox/MessageBox.js';
  export default {
    created: function () {
      MessageBox();
    }
  }
</script>
<style scoped>
</style>
