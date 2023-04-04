<template>
  <Loding v-if="login===null"/>
  <Nabar :login="login"/>

  <main>
    <router-view @title="setTitle" :login="login"/>
  </main>

  <Footer/>
</template>

<script setup>
import {onMounted, ref, watch} from "vue";
import {useI18n} from "vue-i18n";
import Nabar from "./components/Nabar.vue";
import Footer from "./components/Footer.vue";
import axios from "axios";
import Loding from "./components/Loding.vue";

const {t, locale} = useI18n();
const title = ref("")

const login = ref(null)
const nowPage = ref("")


function checkLogin() {
  axios({
    url: "/api/users/verify",
    method: "POST"
  }).then((resp) => {
    if (resp.status === 200) {
      login.value = true
    }
  }).catch((err) => {
    if (err.response.status !== 401) {
      setTimeout(() => {
        checkLogin()
      }, 1000)
    }
    login.value = false
    if (location.pathname !== "/" &&
        location.pathname !== "/learn") {
      console.log(location.pathname)
      location.pathname = "/login.html"
    }
  })
}

checkLogin();

function setTitle(t) {
  title.value = t
}

watch(title, (v) => {
  nowPage.value = v
  document.title = t("title") + "-" + t(nowPage.value)
})

watch(locale, () => {
  document.title = t("title") + "-" + t(nowPage.value)
})

onMounted(() => {
  const meta = document.querySelector('meta[name="description"]');
  meta.setAttribute('content', t("meta description"))
})
</script>

<style scoped>
</style>
