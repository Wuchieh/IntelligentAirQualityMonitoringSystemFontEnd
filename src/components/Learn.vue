<template>
  <div class="container mb-5 overflow-auto">
    <h1 class="mt-5">{{ $t("learnTitle") }}</h1>
    <hr>
    <div class="row gy-5">
      <div class="col-12">
        <h4 class="mt-5">{{ $t("learn1") }}</h4>
        <img class="img-fluid shadow rounded-4" src="https://qr-official.line.me/sid/L/883urgdl.png">
      </div>
      <div class="col-12 col-lg-4">
        <p class="fw-bold">1. {{ $t("learn2") }}</p>
        <img class="img-fluid shadow rounded-4" src="https://i.imgur.com/HUG4Ftr.png" alt="img">
      </div>
      <div class="col-12 col-lg-4">
        <p class="fw-bold">2. {{ $t("learn3") }}</p>
        <img class="img-fluid shadow rounded-4" src="https://i.imgur.com/JpQjzT9.png" alt="img">
      </div>
      <div class="col-12 col-lg-4">
        <p class="fw-bold">3. {{ $t("learn4") }}</p>
        <img class="img-fluid shadow rounded-4" src="https://i.imgur.com/AItpJ5w.png" alt="img">
      </div>
      <div class="col-12">
        <p class="fw-bold">4. {{ $t("learn5") }}</p>
        <img class="img-fluid shadow rounded-4" src="https://cdn.discordapp.com/attachments/717693452762218526/983374104310734908/unknown.png" alt="img">
      </div>
      <div class="col-12">
        <p class="fw-bold">5. {{ $t("learn6") }}</p>
        <img class="img-fluid shadow rounded-4" src="https://cdn.discordapp.com/attachments/717693452762218526/983374759104487514/unknown.png" alt="img">
      </div>
      <div class="col-12 col-lg-4">
        <p class="fw-bold">6. {{ $t("learn7") }}</p>
        <img class="img-fluid shadow rounded-4" src="https://cdn.discordapp.com/attachments/717693452762218526/983375623735111730/unknown.png" alt="img">
      </div>
    </div>
    <h1 class="mt-5">{{ $t("learnTitle2") }}</h1>
    <div class="row gy-5">
      <div class="col-12 col-lg-6">
        <p class="fw-bold">1. {{ $t("learn8") }}</p>
        <img class="img-fluid shadow rounded-4" src="https://cdn.discordapp.com/attachments/717693452762218526/983377899291803708/unknown.png" alt="img">
      </div>
      <div class="col-12 col-lg-6">
        <p class="fw-bold">2. {{ $t("learn9") }}</p>
        <img class="img-fluid shadow rounded-4" src="https://cdn.discordapp.com/attachments/717693452762218526/983376839558955078/unknown.png" alt="img">
      </div>
      <div class="col-12 col-lg-6">
        <p class="fw-bold">3. {{ $t("learn10") }}</p>
        <small>{{ $t("learn10sm") }}</small>
        <img class="img-fluid shadow rounded-4" src="https://cdn.discordapp.com/attachments/717693452762218526/983377363586932796/unknown.png" alt="img">
      </div>
      <div class="col-12 col-lg-6">
        <p class="fw-bold">4. {{ $t("learn11") }}</p>
        <img class="img-fluid shadow rounded-4" src="https://cdn.discordapp.com/attachments/717693452762218526/983380101762781216/unknown.png" alt="img">
      </div>
    </div>
    <h1 class="mt-5">{{ $t("learnTitle3") }}</h1>
    <div class="row gy-5">
      <div class="col-12 col-lg-4">
        <p class="fw-bold">1. {{ $t("learn12") }}</p>
        <img class="mt-auto img-fluid shadow rounded-4" src="https://i.imgur.com/IkByLqV.png" alt="img">
      </div>
      <div class="col-12 col-lg-4">
        <p class="fw-bold">2. {{ $t("learn13") }}</p>
        <img class="mt-auto img-fluid shadow rounded-4" src="https://i.imgur.com/bXwtyQ5.png" alt="img">
      </div>
      <div class="col-12 col-lg-4">
        <p class="fw-bold">3. {{ $t("learn14") }}</p>
        <img class="mt-auto img-fluid shadow rounded-4" src="https://i.imgur.com/fbn9Rrj.png" alt="img">
      </div>
    </div>
  </div>
</template>

<script setup>
import {onMounted} from "vue";

const emits = defineEmits(["title"]);

onMounted(() => {
  emits("title", "learn")
})

</script>

<style scoped>

</style>