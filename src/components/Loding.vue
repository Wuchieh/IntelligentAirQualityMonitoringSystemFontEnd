<template>
  <div>
    <div id="loader" class="position-absolute vw-100 vh-100 bg-white" style="z-index:1025;">
    </div>

    <div class="position-absolute vw-100 vh-100 text-center justify-content-center align-items-center d-flex"
         style="z-index:1026;">

      <div class="spinner-border" role="status" style="height: 13rem;width: 13rem" :style="'color:'+sColor">
        <span class="visually-hidden">Loading...</span>
      </div>

      <div class="position-fixed">
        <h2>Loading...</h2>
      </div>

    </div>
  </div>
</template>

<script setup>

const props = defineProps(["sColor"])

if (props['sColor']){

}
</script>

<style scoped>

</style>