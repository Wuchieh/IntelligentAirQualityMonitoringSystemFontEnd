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
        <img class="img-fluid shadow rounded-4" src="https://cdn.discordapp.com/attachments/842738026786717706/1117995848303906867/login.png" alt="img">
      </div>
      <div class="col-12 col-lg-4">
        <p class="fw-bold">2. {{ $t("learn3") }}</p>
        <img class="img-fluid shadow rounded-4" src="https://cdn.discordapp.com/attachments/842738026786717706/1117837825975533638/2023-06-12_232734.png" alt="img">
      </div>
      <div class="col-12 col-lg-4">
        <p class="fw-bold">3. {{ $t("learn4") }}</p>
        <img class="img-fluid shadow rounded-4" src="https://cdn.discordapp.com/attachments/842738026786717706/1117838983750226010/image.png" alt="img">
      </div>
      <div class="col-12">
        <p class="fw-bold">4. {{ $t("learn5") }}</p>
        <img class="img-fluid shadow rounded-4" src="https://cdn.discordapp.com/attachments/842738026786717706/1117998978110324887/image.png" alt="img">
      </div>
      <div class="col-12">
        <p class="fw-bold">5. {{ $t("learn6") }}</p>
        <img class="img-fluid shadow rounded-4" src="https://cdn.discordapp.com/attachments/842738026786717706/1118081992219697172/setLocationEX.png" alt="img">
      </div>
      <div class="col-12">
        <p class="fw-bold">6. {{ $t("learn7") }}</p>
        <img class="img-fluid shadow rounded-4" src="https://cdn.discordapp.com/attachments/842738026786717706/1117999887359946822/example_location.png" alt="img">
      </div>
    </div>
    <h1 class="mt-5">{{ $t("learnTitle2") }}</h1>
    <div class="row gy-5">
      <div class="col-12 col-lg-6">
        <p class="fw-bold">1. {{ $t("learn8") }}</p>
        <img class="img-fluid shadow rounded-4" src="https://cdn.discordapp.com/attachments/842738026786717706/1118003306988584970/setting_entry.png" alt="img">
      </div>
      <div class="col-12 col-lg-6">
        <p class="fw-bold">2. {{ $t("learn9") }}</p>
        <img class="img-fluid shadow rounded-4" src="https://cdn.discordapp.com/attachments/842738026786717706/1118002832709267577/image.png" alt="img">
      </div>
      <div class="col-12 col-lg-6">
        <p class="fw-bold">3. {{ $t("learn10") }}</p>
        <small>{{ $t("learn10sm") }}</small>
        <img class="img-fluid shadow rounded-4" src="https://cdn.discordapp.com/attachments/842738026786717706/1118020868145172490/image.png" alt="img">
      </div>
      <div class="col-12 col-lg-6">
        <p class="fw-bold">4. {{ $t("learn11") }}</p>
        <img class="img-fluid shadow rounded-4" src="https://cdn.discordapp.com/attachments/842738026786717706/1118004303995621427/image.png" alt="img">
      </div>
    </div>
    <h1 class="mt-5">{{ $t("learnTitle3") }}</h1>
    <div class="row gy-5">
      <div class="col-12 col-lg-4">
        <p class="fw-bold">1. {{ $t("learn12") }}</p>
        <img class="mt-auto img-fluid shadow rounded-4" src="https://cdn.discordapp.com/attachments/842738026786717706/1118007695019102228/setting.png" alt="img">
      </div>
      <div class="col-12 col-lg-4">
        <p class="fw-bold">2. {{ $t("learn13") }}</p>
        <img class="mt-auto img-fluid shadow rounded-4" src="https://media.discordapp.net/attachments/842738026786717706/1118019369692311612/image.png" alt="img">
      </div>
      <div class="col-12 col-lg-4">
        <p class="fw-bold">3. {{ $t("learn14") }}</p>
        <img class="mt-auto img-fluid shadow rounded-4" src="https://cdn.discordapp.com/attachments/842738026786717706/1118019369922986056/image.png" alt="img">
      </div>
      <div class="col-12 col-lg-4">
        <p class="fw-bold">4. {{ $t("learn15") }}</p>
        <img class="mt-auto img-fluid shadow rounded-4" src="https://cdn.discordapp.com/attachments/842738026786717706/1118019370153680896/image.png" alt="img">
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