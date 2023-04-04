<template>

  <div class="form-floating">
    <input id="floatingInput" v-model="Username" class="form-control" placeholder="Username" type="text">
    <label for="floatingInput">{{ $t("username") }}</label>
  </div>

  <div class="form-floating">
    <input id="floatingPassword" v-model="Password" autocomplete="on" class="form-control" placeholder="Password"
           type="password">
    <label for="floatingPassword">{{ $t("password") }}</label>
  </div>

  <div class="checkbox mb-3">
    <label>
      <input v-model="ReadMe" type="checkbox" value="remember-me"> {{ $t("rememberMe7") }}
    </label>
  </div>

  <button class="w-100 btn btn-lg btn-primary" type="submit" @click.prevent="login">
    <div v-show="apiStatus" class="spinner-border" role="status">
      <span class="visually-hidden">Loading...</span>
    </div>
    {{ $t("login") }}
  </button>
</template>

<script setup>
import {ref} from "vue";
import axios from "axios";
import {useI18n} from "vue-i18n";

const Username = ref("")
const Password = ref("")
const apiStatus = ref(false)
const ReadMe = ref(false)
const {t} = useI18n();

const alertShow = (message, type) => {
  const wrapper = document.createElement('div')
  wrapper.innerHTML = [
    `<div class="alert alert-${type} alert-dismissible mb-2" role="alert">`,
    `   <div>${message}</div>`,
    '   <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>',
    '</div>'
  ].join('')
  const alertPlaceholder = document.getElementById('liveAlertPlaceholder')
  alertPlaceholder.append(wrapper)
  setTimeout(() => {
    alertPlaceholder.removeChild(wrapper)
  }, 4999)
}

function alert(data, e) {
  let type = data['status'] ? `success` : `danger`
  alertShow(t(data['msg']), type)

  if (type !== `success`) {
    e.target.classList.remove('disabled')
    apiStatus.value = false
  }
}

function getUserID() {
  const query = window.location.search;
  const params = new URLSearchParams(query);
  return params.get('userId')
}

function login(e) {
  if (Password.value.length < 8 || Username.value.length < 8) {
    alertShow(t("inputLengthLt8"), "danger")
    return
  }
  if (apiStatus.value) {
    return;
  }
  e.target.classList.add('disabled')
  apiStatus.value = true

  axios({
    method: "POST",
    url: "/api/users/login",
    params: {
      userId: getUserID()
    },
    data: {
      Username: Username.value,
      Password: Password.value,
      RememberMe: ReadMe.value
    }
  }).then(
      (response) => {
        alert(response.data, e)
        setTimeout(() => {
          location.href = "/"
        }, 1000)
      }
  ).catch(
      (error) => {
        if (error.response.status === 404) {
          alert({msg: t("networkError")}, e)
        } else {
          alert(error.response.data, e)
        }
      }
  )
}

console.log(getUserID())
</script>

<style scoped>
.form-floating input[type="text"] {
  border-radius: 0;
  margin-bottom: -1px;
}

.form-floating input[type="password"] {
  border-top-right-radius: 0;
  border-top-left-radius: 0;
  margin-bottom: 10px;
}

.form-floating:focus-within {
  z-index: 2;
}

.spinner-border {
  --bs-spinner-width: 1em;
  --bs-spinner-height: 1em;
}
</style>