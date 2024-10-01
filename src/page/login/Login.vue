<template>
  <div class="w-100 position-absolute text-center d-flex justify-content-center">
    <div id="liveAlertPlaceholder" class="col-12 col-md-7  col-xl-4 mx-0"></div>
  </div>
  <div
      class="container-fluid text-center vh-100 w-100 d-flex align-items-center justify-content-center position-sticky top-0">
    <form class="col-12 col-md-6 col-xl-3 p-3">
      <img alt="" class="mb-5 img-fluid" src="/Logo/Logo.png" width="128">
      <ul class="nav nav-tabs">
        <li class="nav-item">
          <a :class="[page===0?'active':'']" aria-current="page" class="nav-link" href="#"
             @click.prevent="changePage(0)">{{ $t("login") }}</a>
        </li>
        <li class="nav-item">
          <a :class="[page===1?'active':'']" class="nav-link" href="#" @click.prevent="changePage(1)">{{ $t("register") }}</a>
        </li>
        <li>
          <div class="d-flex dropdown" role="search">
            <a class="nav-link dropdown-toggle text-dark" role="button" data-bs-toggle="dropdown" aria-expanded="false">
              <svg viewBox="0 0 24 24" width="20" height="20" aria-hidden="true" class="iconLanguage_fsPD"><path fill="currentColor" d="M12.87 15.07l-2.54-2.51.03-.03c1.74-1.94 2.98-4.17 3.71-6.53H17V4h-7V2H8v2H1v1.99h11.17C11.5 7.92 10.44 9.75 9 11.35 8.07 10.32 7.3 9.19 6.69 8h-2c.73 1.63 1.73 3.17 2.98 4.56l-5.09 5.02L4 19l5-5 3.11 3.11.76-2.04zM18.5 10h-2L12 22h2l1.12-3h4.75L21 22h2l-4.5-12zm-2.62 7l1.62-4.33L19.12 17h-3.24z"></path></svg>
            </a>
            <ul class="dropdown-menu">
              <li><a class="dropdown-item" @click="$i18n.locale='zh-TW'">中文</a></li>
              <li><a class="dropdown-item" @click="$i18n.locale='en-US'">English</a></li>
            </ul>
          </div>
        </li>
      </ul>

      <LoginPage v-if="page===0"/>
      <RegisterPage v-else @RegisterEd="RegisterEd"/>
      <p class="mt-5 mb-3 text-muted">© 2021–{{ year }} Wuchieh</p>
    </form>
  </div>
</template>

<script setup>
import LoginPage from "./components/LoginPage.vue";
import {onMounted, ref, watch} from "vue";
import RegisterPage from "./components/RegisterPage.vue";
import {useI18n} from "vue-i18n";

const year = (new Date()).getFullYear()
const page = ref(0)
const {t,locale} = useI18n();

function changePage(i) {
  page.value = i
}

function RegisterEd() {
  page.value = 0
}
onMounted(()=>{
  document.title = t("title")+"-"+t("noLogin")
  const meta = document.querySelector('meta[name="description"]');
  meta.setAttribute('content', t("meta description"))
})
watch(locale, (newlocale) => {
  localStorage.setItem("locale", newlocale);
  document.title = t("title")+"-"+t("noLogin")
});
</script>

<style scoped>
#liveAlertPlaceholder {
  z-index: 4;
}
</style>

<style>
.alert {
  opacity: 0;
  animation: openIn 5s;
}

@keyframes openIn {
  0% {
    opacity: 0;
  }
  5% {
    opacity: 1;
  }
  95% {
    opacity: 1;
  }
  100% {
    opacity: 0;
  }
}
</style>
