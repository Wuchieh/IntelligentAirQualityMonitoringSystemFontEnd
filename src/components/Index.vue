<template>
  <Loading v-if="login!==null && !announcements" :sColor="`#ff0000`"/>

  <div class="container mb-5">

    <div class="row">
      <h1 class="mt-5">{{ $t("index-title") }}</h1>
    </div>

    <hr>

    <div class="gy-4">

      <div class="col-mt-8 portfolio-item" v-for="(v,k) in announcements">
        <img src="https://elearning.uch.edu.tw/sys/res/icon/cal_announce.gif" class="me-2" alt="img">
        <h3 style="display:inline;"><a href="" @click.prevent="getAnnouncementContent(v['Id'])">
          {{ titleFormat(v["Title"]) }}
        </a></h3>
        <div :id="v['Id']" style="overflow: hidden"
             class="mt-3 border border-2 AnnouncementContent"
             v-html="getContent(v['Id'],v['CreateTime'])">
        </div>
      </div>

    </div>
  </div>
</template>

<script setup>
import {useI18n} from "vue-i18n";
import {onMounted, ref, watch} from "vue";
import axios from "axios";
import Loading from "./Loding.vue";
import moment from 'moment';

const announcements = ref();
const emits = defineEmits(["title"]);
const props = defineProps(['login'])
const {t, locale} = useI18n();
const contentMap = ref({})

function formatTime(time) {
  return moment(time).subtract(8, 'hours').format('YYYY-MM-DD HH:mm:ss');
}

function getContent(id, time) {
  let date = formatTime(time)
  let lang = 0
  switch (locale.value) {
    case "zh-TW":
      break
    case "en-US":
    default:
      lang = 1
      break
  }
  if (contentMap.value[`${id}`]) {
    return `<small>` + date + `</small><hr>` + contentMap.value[`${id}`][lang]
  }
  return ''
}
function getAnnouncementContent(id) {
  let element = document.getElementById(id);

  if (element.innerHTML.length === 0) {
    axios({
      url: "/api/announcements/content",
      params: {id: id}
    }).then((resp) => {
      contentMap.value[`${id}`] = resp["data"]
      setTimeout(()=>{getAnnouncementContent(id)},100)
    }).catch((err) => {
      console.log(err)
    })
  }else {
    if (element.classList.contains('show')) {
      element.classList.remove('show');
    } else {
      element.classList.add('show');
    }
  }
}

function titleFormat(titleArray) {
  let title
  switch (locale.value) {
    case "zh-TW":
      title = titleArray[0]
      break
    case "en-US":
    default:
      title = titleArray[1]
      break
  }
  if (String(title)[0] === "\"") {
    return title.slice(1, title.length - 1)
  } else {
    return title
  }
}


function GetAnnouncements() {
  axios({
    url: "/api/announcements"
  }).then((resp) => {
    announcements.value = resp["data"]
  }).catch((err) => {
    console.log(err)
    GetAnnouncements()
  })
}

onMounted(() => {
  emits("title", "index")
  console.log("⡆⣐⢕⢕⢕⢕⢕⢕⢕⢕⠅⢗⢕⢕⢕⢕⢕⢕⢕⠕⠕⢕⢕⢕⢕⢕⢕⢕⢕⢕\n⢐⢕⢕⢕⢕⢕⣕⢕⢕⠕⠁⢕⢕⢕⢕⢕⢕⢕⢕⠅⡄⢕⢕⢕⢕⢕⢕⢕⢕⢕\n⢕⢕⢕⢕⢕⠅⢗⢕⠕⣠⠄⣗⢕⢕⠕⢕⢕⢕⠕⢠⣿⠐⢕⢕⢕⠑⢕⢕⠵⢕\n⢕⢕⢕⢕⠁⢜⠕⢁⣴⣿⡇⢓⢕⢵⢐⢕⢕⠕⢁⣾⢿⣧⠑⢕⢕⠄⢑⢕⠅⢕\n⢕⢕⠵⢁⠔⢁⣤⣤⣶⣶⣶⡐⣕⢽⠐⢕⠕⣡⣾⣶⣶⣶⣤⡁⢓⢕⠄⢑⢅⢑\n⠍⣧⠄⣶⣾⣿⣿⣿⣿⣿⣿⣷⣔⢕⢄⢡⣾⣿⣿⣿⣿⣿⣿⣿⣦⡑⢕⢤⠱⢐\n⢠⢕⠅⣾⣿⠋⢿⣿⣿⣿⠉⣿⣿⣷⣦⣶⣽⣿⣿⠈⣿⣿⣿⣿⠏⢹⣷⣷⡅⢐\n⣔⢕⢥⢻⣿⡀⠈⠛⠛⠁⢠⣿⣿⣿⣿⣿⣿⣿⣿⡀⠈⠛⠛⠁⠄⣼⣿⣿⡇⢔\n⢕⢕⢽⢸⢟⢟⢖⢖⢤⣶⡟⢻⣿⡿⠻⣿⣿⡟⢀⣿⣦⢤⢤⢔⢞⢿⢿⣿⠁⢕\n⢕⢕⠅⣐⢕⢕⢕⢕⢕⣿⣿⡄⠛⢀⣦⠈⠛⢁⣼⣿⢗⢕⢕⢕⢕⢕⢕⡏⣘⢕\n⢕⢕⠅⢓⣕⣕⣕⣕⣵⣿⣿⣿⣾⣿⣿⣿⣿⣿⣿⣿⣷⣕⢕⢕⢕⢕⡵⢀⢕⢕\n⢑⢕⠃⡈⢿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⢃⢕⢕⢕\n⣆⢕⠄⢱⣄⠛⢿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⠿⢁⢕⢕⠕⢁\n⣿⣦⡀⣿⣿⣷⣶⣬⣍⣛⣛⣛⡛⠿⠿⠿⠛⠛⢛⣛⣉⣭⣤⣂⢜⠕⢑⣡⣴⣿\n")
  console.log('%c等一下！', 'color: #5865f2; padding: 10px; font-size: 66px; text-shadow: 0 0 5px #000;');
  console.log('%c如果有人叫您在這裡複製/貼上任何東西，您百分之百被騙了。', 'color: #fff; font-size: 16px; padding: 10px;');
  console.log('%c在這裡貼上任何資訊，均有可能讓惡意攻擊者存取您的 監測系統 的帳號。', 'color: #ff0000; font-size: 16px; font-weight: bold; padding: 10px;');
})

GetAnnouncements();
</script>

<style scoped>
.AnnouncementContent {
  opacity: 0;
  max-height: 0;
  overflow: hidden;

  /*transition: max-height .5s,opacity .5s, padding-bottom .5s, padding-top .5s, padding-left 10s, padding-right 10s;*/
  transition: all .5s;
}

.AnnouncementContent.show {
  padding: 10px;
  opacity: 1;
  margin-bottom: 10px;
  max-height: 500px;

  /*transition: max-height .5s,opacity .5s;*/
}
</style>