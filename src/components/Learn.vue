<template>
  <div class="container mb-5 overflow-auto">
    <h1 class="mt-5">{{ $t("learnTitle") }}</h1>
    <hr>
    <div class="row gy-5">
      <div class="col-12">
        <h4 class="mt-5">{{ $t("learn1") }}</h4>
        <img class="img-fluid shadow rounded-4" src="https://qr-official.line.me/sid/L/164udnet.png">
      </div>
      <div class="col-12 col-lg-4">
        <p class="fw-bold">1. {{ $t("learn2") }}</p>
        <img class="img-fluid shadow rounded-4" src="https://i.imgur.com/bzOWOOt.png" alt="img">
      </div>
      <div class="col-12 col-lg-4">
        <p class="fw-bold">2. {{ $t("learn3") }}</p>
        <img class="img-fluid shadow rounded-4" src="https://i.imgur.com/pGg9dEF.png" alt="img">
      </div>
      <div class="col-12 col-lg-4">
        <p class="fw-bold">3. {{ $t("learn4") }}</p>
        <img class="img-fluid shadow rounded-4" src="https://i.imgur.com/levmjf6.png" alt="img">
      </div>
      <div class="col-12">
        <p class="fw-bold">4. {{ $t("learn5") }}</p>
        <img class="img-fluid shadow rounded-4" src="https://i.imgur.com/wHppVtX.png" alt="img">
      </div>
      <div class="col-12">
        <p class="fw-bold">5. {{ $t("learn6") }}</p>
        <img class="img-fluid shadow rounded-4" src="https://i.imgur.com/V0u3cP0.png" alt="img">
      </div>
      <div class="col-12">
        <p class="fw-bold">6. {{ $t("learn7") }}</p>
        <img class="img-fluid shadow rounded-4" src="https://i.imgur.com/QpxYdXM.png" alt="img">
      </div>
    </div>
    <h1 class="mt-5">{{ $t("learnTitle2") }}</h1>
    <div class="row gy-5">
      <div class="col-12 col-lg-6">
        <p class="fw-bold">1. {{ $t("learn8") }}</p>
        <img class="img-fluid shadow rounded-4" src="https://i.imgur.com/3FsBRMD.png" alt="img">
      </div>
      <div class="col-12 col-lg-6">
        <p class="fw-bold">2. {{ $t("learn9") }}</p>
        <img class="img-fluid shadow rounded-4" src="https://i.imgur.com/kvzSjBR.png" alt="img">
      </div>
      <div class="col-12 col-lg-6">
        <p class="fw-bold">3. {{ $t("learn10") }}</p>
        <small>{{ $t("learn10sm") }}</small>
        <img class="img-fluid shadow rounded-4" src="https://i.imgur.com/Nt1exhN.png" alt="img">
      </div>
      <div class="col-12 col-lg-6">
        <p class="fw-bold">4. {{ $t("learn11") }}</p>
        <img class="img-fluid shadow rounded-4" src="https://i.imgur.com/6tfLBTT.png" alt="img">
      </div>
    </div>
    <h1 class="mt-5">{{ $t("learnTitle3") }}</h1>
    <div class="row gy-5">
      <div class="col-12 col-lg-4">
        <p class="fw-bold">1. {{ $t("learn12") }}</p>
        <img class="mt-auto img-fluid shadow rounded-4" src="https://i.imgur.com/yBJ0uYh.png" alt="img">
      </div>
      <div class="col-12 col-lg-4">
        <p class="fw-bold">2. {{ $t("learn13") }}</p>
        <img class="mt-auto img-fluid shadow rounded-4" src="https://i.imgur.com/ho8lEIR.png" alt="img">
      </div>
      <div class="col-12 col-lg-4">
        <p class="fw-bold">3. {{ $t("learn14") }}</p>
        <img class="mt-auto img-fluid shadow rounded-4" src="https://i.imgur.com/xq9MaE0.png" alt="img">
      </div>
      <div class="col-12 col-lg-4">
        <p class="fw-bold">4. {{ $t("learn15") }}</p>
        <img class="mt-auto img-fluid shadow rounded-4" src="https://i.imgur.com/2KUT52i.png" alt="img">
      </div>
    </div>
  </div>
</template>

<script setup>
import {onMounted} from "vue";

const emits = defineEmits(["title"]);

onMounted(() => {
  emits("title", "learn")
  console.log("⡆⣐⢕⢕⢕⢕⢕⢕⢕⢕⠅⢗⢕⢕⢕⢕⢕⢕⢕⠕⠕⢕⢕⢕⢕⢕⢕⢕⢕⢕\n⢐⢕⢕⢕⢕⢕⣕⢕⢕⠕⠁⢕⢕⢕⢕⢕⢕⢕⢕⠅⡄⢕⢕⢕⢕⢕⢕⢕⢕⢕\n⢕⢕⢕⢕⢕⠅⢗⢕⠕⣠⠄⣗⢕⢕⠕⢕⢕⢕⠕⢠⣿⠐⢕⢕⢕⠑⢕⢕⠵⢕\n⢕⢕⢕⢕⠁⢜⠕⢁⣴⣿⡇⢓⢕⢵⢐⢕⢕⠕⢁⣾⢿⣧⠑⢕⢕⠄⢑⢕⠅⢕\n⢕⢕⠵⢁⠔⢁⣤⣤⣶⣶⣶⡐⣕⢽⠐⢕⠕⣡⣾⣶⣶⣶⣤⡁⢓⢕⠄⢑⢅⢑\n⠍⣧⠄⣶⣾⣿⣿⣿⣿⣿⣿⣷⣔⢕⢄⢡⣾⣿⣿⣿⣿⣿⣿⣿⣦⡑⢕⢤⠱⢐\n⢠⢕⠅⣾⣿⠋⢿⣿⣿⣿⠉⣿⣿⣷⣦⣶⣽⣿⣿⠈⣿⣿⣿⣿⠏⢹⣷⣷⡅⢐\n⣔⢕⢥⢻⣿⡀⠈⠛⠛⠁⢠⣿⣿⣿⣿⣿⣿⣿⣿⡀⠈⠛⠛⠁⠄⣼⣿⣿⡇⢔\n⢕⢕⢽⢸⢟⢟⢖⢖⢤⣶⡟⢻⣿⡿⠻⣿⣿⡟⢀⣿⣦⢤⢤⢔⢞⢿⢿⣿⠁⢕\n⢕⢕⠅⣐⢕⢕⢕⢕⢕⣿⣿⡄⠛⢀⣦⠈⠛⢁⣼⣿⢗⢕⢕⢕⢕⢕⢕⡏⣘⢕\n⢕⢕⠅⢓⣕⣕⣕⣕⣵⣿⣿⣿⣾⣿⣿⣿⣿⣿⣿⣿⣷⣕⢕⢕⢕⢕⡵⢀⢕⢕\n⢑⢕⠃⡈⢿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⢃⢕⢕⢕\n⣆⢕⠄⢱⣄⠛⢿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⠿⢁⢕⢕⠕⢁\n⣿⣦⡀⣿⣿⣷⣶⣬⣍⣛⣛⣛⡛⠿⠿⠿⠛⠛⢛⣛⣉⣭⣤⣂⢜⠕⢑⣡⣴⣿\n")
  console.log('%c等一下！', 'color: #5865f2; padding: 10px; font-size: 66px; text-shadow: 0 0 5px #000;');
  console.log('%c如果有人叫您在這裡複製/貼上任何東西，您百分之百被騙了。', 'color: #fff; font-size: 16px; padding: 10px;');
  console.log('%c在這裡貼上任何資訊，均有可能讓惡意攻擊者存取您的 監測系統 的帳號。', 'color: #ff0000; font-size: 16px; font-weight: bold; padding: 10px;');
})

</script>

<style scoped>

</style>