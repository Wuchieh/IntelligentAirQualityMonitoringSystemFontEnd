<template>

  <div class="form-floating">
    <input id="floatingInput" v-model="Username" class="form-control" placeholder="Username" type="text">
    <label for="floatingInput">{{ $t("username") }}</label>
  </div>

  <div class="form-floating">
    <input id="floatingPassword" v-model="Password" autocomplete="on" class="form-control" name="Password"
           placeholder="Password" type="password">
    <label for="floatingPassword">{{ $t("password") }}</label>
  </div>

  <div class="form-floating">
    <input id="floatingConfirmPassword" v-model="ConfirmPassword" autocomplete="on" class="form-control"
           name="ConfirmPassword"
           placeholder="Password" type="password">
    <label for="floatingConfirmPassword">{{ $t('confirmPassword') }}</label>
  </div>

  <button class="w-100 btn btn-lg btn-primary" @click.prevent="register">
    <div v-show="apiStatus" class="spinner-border" role="status">
      <span class="visually-hidden">Loading...</span>
    </div>
    {{ $t("register") }}
  </button>
</template>

<script setup>
import {ref} from "vue";
import axios from "axios";
import {useI18n} from "vue-i18n";

const Username = ref("")
const Password = ref("")
const ConfirmPassword = ref("")
const apiStatus = ref(false)
const {t} = useI18n();

const emits = defineEmits(["RegisterEd"])

// type:{danger,success}
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
  } else {
    emits("RegisterEd")
  }
}

function register(e) {
  if (Password.value !== ConfirmPassword.value) {
    alertShow(t('confirmPasswordError'), "danger")
    return
  }else if(Username.value.length<8||Password.value.length<8){
    alertShow(t('inputLengthLt8'), "danger")
    return
  }
  if (apiStatus.value) {
    return;
  }
  e.target.classList.add('disabled')
  apiStatus.value = true

  axios({
    method: "POST",
    url: "/api/users/register",
    data: {
      Username: Username.value,
      Password: Password.value
    }
  }).then(
      (response) => {
        alert(response.data, e)
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


</script>

<style scoped>
.form-floating input[type="text"] {
  border-radius: 0;
  margin-bottom: -1px;
}

.form-floating input[name="Password"] {
  border-radius: 0;
  margin-bottom: -1px;
}

.form-floating input[name="ConfirmPassword"] {
  border-top-right-radius: 0;
  border-top-left-radius: 0;
  margin-bottom: 20px;
}

.form-floating:focus-within {
  z-index: 2;
}

.spinner-border {
  --bs-spinner-width: 1em;
  --bs-spinner-height: 1em;
}
</style>