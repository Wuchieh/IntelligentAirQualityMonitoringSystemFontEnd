<template>
  <Loading v-if="login!==null && !loaded" :sColor="`#fff325`"/>
  <Alert :alert-message="alertMsg" :alert-type="alertType"/>
  <div class="modal fade" id="confirmDelModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          <h1 class="modal-title fs-5" id="exampleModalLabel">{{ $t("confirmDelete") }}</h1>
          <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
        </div>
        <div class="modal-body" v-if="locations">
          {{ $t("confirmDeleteModal") }}{{ locations[locationSelect]["NiceName"] }}
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">{{ $t("cancel") }}</button>
          <button type="button" class="btn btn-primary" data-bs-dismiss="modal" @click="deleteLocation">{{
              $t("confirm")
            }}
          </button>
        </div>
      </div>
    </div>
  </div>

  <div class="container mb-5">
    <div class="d-flex">
      <h1 class="mt-5">{{ $t("setting") }}
        <small v-if="!LinkingLine" class="fs-6 ms-1 text-danger">{{ $t("notLinkLine") }}</small>
      </h1>

    </div>
    <hr>
    <div class="row gy-1" id="selectPos" v-if="locations">
      <p class="ps-3">{{ $t("selectLocation") }}</p>

      <div class="col-12 col-md-6 col-lg-3">
        <select class="form-select" id="pos" v-model="locationSelect">
          <option v-for="(i,k) in locations" :value="k">{{ i["NiceName"] }}</option>
        </select>
      </div>

      <p class="ps-3" style="margin-top: 20px;">{{ $t("setLocationRangeLabel") }}</p>

      <div class="col-12 col-md-6 col-lg-3">
        <select class="form-select" id="range" v-model="rangeSelect">
          <option :value=100>100 {{ $t("meters") }}</option>
          <option :value=200>200 {{ $t("meters") }}</option>
          <option :value=500>500 {{ $t("meters") }}</option>
        </select>
      </div>

      <div class="gy-2 d-flex">
        <input class="me-2 btn btn-primary" id="posSubmit" type="submit" :value="$t('confirm')"
               :disabled="apiStatus" @click="selectLocationChange">

        <!--        <input class="btn btn-danger" id="delSubmit" type="submit" :value="$t('delete')"-->
        <!--               :disabled="apiStatus" @click="deleteLocation">-->
        <button type="button" class="btn btn-danger" data-bs-toggle="modal" data-bs-target="#confirmDelModal"
                :disabled="apiStatus">
          {{ $t('delete') }}
        </button>
      </div>

      <div class="row gy-2">
        <hr>
      </div>
    </div>

    <div class="row">
      <p class="ps-3">{{ $t("selectNotificationRange") }}</p>
      <div class="col-12 col-md-6 col-lg-3">
        <select class="form-select" id="time" v-model="NoticeInterval">
          <option v-for="i in [0,1,2,4,8,12,24]" :value=i>
            {{
              i === 0 ? $t('noNotification') :
                  i > 1 ? `${i} ` + $t("hours") : `${i} ` + $t("hour")
            }}
          </option>
        </select>
      </div>
      <div class="gy-2">
        <input class="btn btn-success" id="timeSubmit" type="submit" :value="$t('confirm')"
               :disabled="apiStatus" @click="changeNotificationRange"/>
      </div>
    </div>
  </div>
</template>

<script setup>
import {onMounted, ref, watch} from "vue";
import axios from "axios";
import Loading from "./Loding.vue";
import Alert from "./Alert.vue";

const props = defineProps(["login"])
const emits = defineEmits(["title"]);
const locations = ref(null)
const locationSelect = ref(0)
const rangeSelect = ref(100)
const NoticeInterval = ref(0)
let NoticeIntervalL = 0
const apiStatus = ref(false) // 是否正在使用api
const alertMsg = ref("")
const alertType = ref("")
const loaded = ref(false)
const LinkingLine = ref(false)

watch(locationSelect, (v) => {
  rangeSelect.value = locations.value[v]["Range"]
})

function sendAlert(t, m) {
  alertType.value = t
  alertMsg.value = m
  setTimeout(() => {
    alertMsg.value = ""
  }, 10)
}

function getLocations() {
  axios({
    url: "/api/setting/info"
  }).then((resp) => {
    loaded.value = true
    if (resp.data["status"]) {
      LinkingLine.value = Boolean(resp.data["LinkingLine"])
      NoticeInterval.value = Number(resp.data["NoticeInterval"])
      NoticeIntervalL = NoticeInterval.value
      locationSelect.value = 0
      locations.value = resp.data["data"]
      if (locations.value !== null && locations.value.length > 0) {
        rangeSelect.value = locations.value[0]["Range"]
      }
    }
  }).catch((err) => {
    console.log(err)
    if (err["response"]["status"] !== 404) {
      setTimeout(() => {
        location.reload()
      }, 1000)
      return
    }
    setTimeout(() => getLocations(), 1000)
  })
}


function selectLocationChange() {
  apiStatus.value = true
  const locationSelectIndex = locationSelect.value
  const data = locations.value[locationSelectIndex]
  const range = rangeSelect.value
  if (locations.value[locationSelectIndex]["Range"] === range) {
    apiStatus.value = false
    sendAlert("warning", "noChange")
    return
  }
  axios({
    url: "/api/location/edit",
    method: "POST",
    data: {
      "ID": data["ID"],
      "Range": range,
    }
  }).then((resp) => {
    apiStatus.value = false
    sendAlert("success", resp['data']['msg'])
    locations.value[locationSelectIndex]["Range"] = range;
  }).catch((err) => {
    apiStatus.value = false
    console.log(err)

    const data = err["response"]["data"]

    if (typeof data === 'object') {
      sendAlert("danger", data["msg"])
    } else {
      sendAlert("warning", "networkError")
    }
  })

}

function deleteLocation() {
  apiStatus.value = true
  const locationSelectIndex = locationSelect.value
  const data = locations.value[locationSelectIndex]
  axios({
    url: "/api/location/delete",
    method: "POST",
    data: data
  }).then((resp) => {
    apiStatus.value = false
    getLocations()
    if (resp["data"]["status"]) {
      sendAlert("success", resp["data"]["msg"])
    }
  }).catch((err) => {
    apiStatus.value = false

    const data = err["response"]["data"]
    if (typeof data === 'object') {
      sendAlert("danger", data["msg"])
    } else {
      sendAlert("warning", "networkError")
    }
  })
}

function changeNotificationRange() {
  if (NoticeInterval.value === NoticeIntervalL) {
    {
      apiStatus.value = false
      sendAlert("warning", "noChange")
      return
    }
  }
  axios({
    url: "/api/setting/edit",
    method: "POST",
    data: {NotificationRange: NoticeInterval.value}
  }).then((resp) => {
    NoticeIntervalL = NoticeInterval.value
    if (resp["data"]["status"]) {
      sendAlert("success", resp["data"]["msg"])
    }
  }).catch((err) => {
    const data = err["response"]["data"]
    if (typeof data === 'object') {
      sendAlert("danger", data["msg"])
    } else {
      sendAlert("warning", "networkError")
    }
  })
}

onMounted(() => {
  emits("title", "setting")
  if (props["login"]) {
    getLocations()
  } else if (props["login"] === false) {
    location.pathname = "/login.html"
  }
  console.log("⡆⣐⢕⢕⢕⢕⢕⢕⢕⢕⠅⢗⢕⢕⢕⢕⢕⢕⢕⠕⠕⢕⢕⢕⢕⢕⢕⢕⢕⢕\n⢐⢕⢕⢕⢕⢕⣕⢕⢕⠕⠁⢕⢕⢕⢕⢕⢕⢕⢕⠅⡄⢕⢕⢕⢕⢕⢕⢕⢕⢕\n⢕⢕⢕⢕⢕⠅⢗⢕⠕⣠⠄⣗⢕⢕⠕⢕⢕⢕⠕⢠⣿⠐⢕⢕⢕⠑⢕⢕⠵⢕\n⢕⢕⢕⢕⠁⢜⠕⢁⣴⣿⡇⢓⢕⢵⢐⢕⢕⠕⢁⣾⢿⣧⠑⢕⢕⠄⢑⢕⠅⢕\n⢕⢕⠵⢁⠔⢁⣤⣤⣶⣶⣶⡐⣕⢽⠐⢕⠕⣡⣾⣶⣶⣶⣤⡁⢓⢕⠄⢑⢅⢑\n⠍⣧⠄⣶⣾⣿⣿⣿⣿⣿⣿⣷⣔⢕⢄⢡⣾⣿⣿⣿⣿⣿⣿⣿⣦⡑⢕⢤⠱⢐\n⢠⢕⠅⣾⣿⠋⢿⣿⣿⣿⠉⣿⣿⣷⣦⣶⣽⣿⣿⠈⣿⣿⣿⣿⠏⢹⣷⣷⡅⢐\n⣔⢕⢥⢻⣿⡀⠈⠛⠛⠁⢠⣿⣿⣿⣿⣿⣿⣿⣿⡀⠈⠛⠛⠁⠄⣼⣿⣿⡇⢔\n⢕⢕⢽⢸⢟⢟⢖⢖⢤⣶⡟⢻⣿⡿⠻⣿⣿⡟⢀⣿⣦⢤⢤⢔⢞⢿⢿⣿⠁⢕\n⢕⢕⠅⣐⢕⢕⢕⢕⢕⣿⣿⡄⠛⢀⣦⠈⠛⢁⣼⣿⢗⢕⢕⢕⢕⢕⢕⡏⣘⢕\n⢕⢕⠅⢓⣕⣕⣕⣕⣵⣿⣿⣿⣾⣿⣿⣿⣿⣿⣿⣿⣷⣕⢕⢕⢕⢕⡵⢀⢕⢕\n⢑⢕⠃⡈⢿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⢃⢕⢕⢕\n⣆⢕⠄⢱⣄⠛⢿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⠿⢁⢕⢕⠕⢁\n⣿⣦⡀⣿⣿⣷⣶⣬⣍⣛⣛⣛⡛⠿⠿⠿⠛⠛⢛⣛⣉⣭⣤⣂⢜⠕⢑⣡⣴⣿\n")
  console.log('%c等一下！', 'color: #5865f2; padding: 10px; font-size: 66px; text-shadow: 0 0 5px #000;');
  console.log('%c如果有人叫您在這裡複製/貼上任何東西，您百分之百被騙了。', 'color: #fff; font-size: 16px; padding: 10px;');
  console.log('%c在這裡貼上任何資訊，均有可能讓惡意攻擊者存取您的 監測系統 的帳號。', 'color: #ff0000; font-size: 16px; font-weight: bold; padding: 10px;');
})

watch(props, (v) => {
  if (v["login"]) {
    getLocations()
  }
})
</script>
