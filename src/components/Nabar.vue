<template>
  <nav class="navbar sticky-top navbar-expand-md navbar-dark bg-dark">
    <div class="container">
      <router-link to="/" class="navbar-brand">{{ $t("navbarTitle") }}</router-link>
      <button class="navbar-toggler collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#navbar" aria-expanded="false">
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="navbar-collapse collapse" id="navbar">
        <ul class="navbar-nav me-auto">
          <li class="nav-item">
            <router-link to="/map" class="nav-link" :active-class="`active`">{{ $t("map") }}</router-link>
          </li>
          <li class="nav-item">
            <router-link to="/setting" class="nav-link" :active-class="`active`">{{ $t("setting") }}</router-link>
          </li>
          <li class="nav-item">
            <router-link to="/learn" class="nav-link" :active-class="`active`">{{ $t("learn") }}</router-link>
          </li>
          <li class="nav-item" v-show="login!==null">
            <a href="/login.html" class="nav-link" v-if="!login">{{ $t("noLogin") }}</a>
            <a href="/logout" @click.prevent="logout" class="nav-link m-0" v-else>{{ $t("isLogin") }}</a>
          </li>
        </ul>
        <div class="d-flex dropdown" role="search">
          <a class="nav-link dropdown-toggle text-light" role="button" data-bs-toggle="dropdown" aria-expanded="false">
            <svg viewBox="0 0 24 24" width="20" height="20" aria-hidden="true" class="iconLanguage_fsPD">
              <path fill="currentColor"
                    d="M12.87 15.07l-2.54-2.51.03-.03c1.74-1.94 2.98-4.17 3.71-6.53H17V4h-7V2H8v2H1v1.99h11.17C11.5 7.92 10.44 9.75 9 11.35 8.07 10.32 7.3 9.19 6.69 8h-2c.73 1.63 1.73 3.17 2.98 4.56l-5.09 5.02L4 19l5-5 3.11 3.11.76-2.04zM18.5 10h-2L12 22h2l1.12-3h4.75L21 22h2l-4.5-12zm-2.62 7l1.62-4.33L19.12 17h-3.24z"></path>
            </svg>
          </a>
          <ul class="dropdown-menu">
            <li><a class="dropdown-item" @click="$i18n.locale='zh-TW'">中文</a></li>
            <li><a class="dropdown-item" @click="$i18n.locale='en-US'">English</a></li>
          </ul>
        </div>
      </div>
    </div>
  </nav>
</template>

<script setup>
import {useI18n} from "vue-i18n";
import {watch} from "vue";
import axios from "axios";

const {t, locale} = useI18n();

const props = defineProps(["login"])
watch(locale, (newlocale) => {
  localStorage.setItem("locale", newlocale);
});


function logout() {
  const reload = ()=>{
    location.href = "/"
  }
  axios({
    url:"/api/users/logout",
    method:"POST"
  }).then(reload).catch(reload)
}
</script>

<style lang="scss" scoped>

</style>