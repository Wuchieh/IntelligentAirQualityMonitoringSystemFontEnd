<template>
  <Alert :alert-message="alertMsg" :alert-type="alertType"/>
  <div class="container mt-4">
    <h2>{{ $t("sendmsg") }}</h2>

    <!-- 輸入密碼框 -->
    <div class="mb-3">
      <label for="password" class="form-label">{{ $t("sendmsg-password") }}：</label>
      <input type="password" class="form-control" id="password" v-model="password">
    </div>

    <!-- 確認按鈕 -->
    <button class="btn btn-primary" @click="confirm">{{ $t("sendmsg-confirm") }}</button>

    <!-- 選擇用戶下拉選單 -->
    <div class="mt-4" v-if="Object.keys(users).length > 0">
      <label for="userSelect" class="form-label">{{ $t("sendmsg-selectUser") }}：</label>
      <select class="form-select" id="userSelect" v-model="selectedUser">
        <option v-for="(lineID, key) in users" :value="lineID">{{ key }}</option>
      </select>
    </div>

    <!-- 多行文字輸入框 -->
    <div class="mt-4" v-if="Object.keys(users).length > 0">
      <label for="message" class="form-label">{{ $t("sendmsg-message") }}：</label>
      <textarea class="form-control" id="message" rows="4" v-model="message"></textarea>
    </div>

    <!-- 發送訊息按鈕 -->
    <div class="mt-4" v-if="Object.keys(users).length > 0">
      <button class="btn btn-success" @click="sendMessage">{{ $t("sendmsg-sendMessage") }}</button>
    </div>
  </div>
</template>

<script setup>
import { onMounted, ref } from "vue";
import axios from "axios";
import { sha256 } from "js-sha256";
import {useI18n} from "vue-i18n";
import Alert from "./Alert.vue";

const emits = defineEmits(["title"]);

const password = ref("");
const users = ref({});
const selectedUser = ref("");
const message = ref("");
const {t} = useI18n();

const alertMsg = ref("")
const alertType = ref("")

function sendAlert(t, m) {
  alertType.value = t
  alertMsg.value = m
  setTimeout(() => {
    alertMsg.value = ""
  }, 10)
}

const confirm = async () => {
  const url = "/api/line/getlineIDs";
  const frontendHash = sha256(password.value);

  try {
    const formData = new FormData();
    formData.append("token", frontendHash);

    const response = await axios.post(url, formData);
    users.value = response.data;

    sendAlert("success", "getUserListSuccess"); // 顯示成功訊息
  } catch (error) {
    console.error(error);
    sendAlert("danger", `${t("getUserListFailure")}<br>${error}`); // 顯示錯誤訊息
  }
};

const sendMessage = async () => {
  console.log("Selected User:", selectedUser.value);
  console.log("Message:", message.value);

  const url = "/v1/send-notification";
  const frontendHash = sha256(password.value);

  try {
    const formData = new FormData();
    formData.append("message", message.value);
    formData.append("lineID", selectedUser.value);
    formData.append("token", frontendHash);

    await axios.post(url, formData);
    // 發送成功的處理邏輯
    sendAlert("success", "sendSuccess"); // 顯示成功訊息
  } catch (error) {
    console.error(error);
    sendAlert("danger", "sendFailure"); // 顯示錯誤訊息
  }
};

onMounted(() => {
  emits("title", "sendmsg");
});
</script>

<style scoped>
</style>
