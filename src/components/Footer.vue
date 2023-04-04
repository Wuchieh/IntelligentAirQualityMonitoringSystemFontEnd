<template>
  <div class="bg-light footer">
    <div class="container text-center py-2" id="getCurrentDate">Copyright © Company 2021 - {{ String((new Date()).getFullYear()) }}</div>
  </div>
</template>

<script setup>
</script>

<style scoped>
.footer{
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
}
</style>