<template>
  <div class="w-100 position-absolute text-center d-flex justify-content-center m-auto" style="height: 0;z-index: 10">
    <div id="liveAlertPlaceholder" class="col-12 col-md-7  col-xl-4 mx-0" ref="alertBox">

    </div>
  </div>
</template>

<script setup>

import {ref, watch} from "vue";
import {useI18n} from "vue-i18n";

const props = defineProps(["alertType", "alertMessage"])
const alertBox = ref(null)
const {t} = useI18n();

watch(props, () => {
  if(props["alertMessage"] ===""){return}
  alertBox.value.innerHTML =
      `<div class="alert alert-${props['alertType']} " role="alert"
           v-text="alertMessage"
           style="animation: toOp0 5s forwards;">
           ${t(props['alertMessage'])}
      </div>`
})
</script>

<style>
@keyframes toOp0 {
  from {
    display: block;
    opacity: 1;
  }
  to {
    display: block;
    opacity: 0;
  }
}
</style>