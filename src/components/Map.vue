<template>
  <Alert :alert-message="alertMsg" :alert-type="alertType"/>
  <div class="container" v-if="login">
    <div class="row">
      <input id="search-box" class="controls" type="text" :placeholder="$t('search')">
      <div id="map"></div>
      <div class="row gy-1" id="button">
        <div>
          <input type="text" maxLength="16" :placeholder="$t('plsEnterName')" v-model="setName" class="me-2">
          <button type="button" class="btn btn-secondary" @click="createNewLocation" :disabled="apiStatus">
            {{ $t('confirm') }}
          </button>
        </div>
        <div class="gy-1 mb-5 d-flex">
          <button class="btn btn-secondary mx-1" @click="getGPSLocation">{{ $t("positioning") }}</button>
          <button class="btn btn-secondary mx-1" @click="resetLocation">{{ $t("resetPositioning") }}</button>
        </div>
        <p style="height: 20px" id="coordinate" class="d-none">{{ coordinate }}</p>
      </div>
    </div>
  </div>
</template>

<script setup>
import {Loader} from "@googlemaps/js-api-loader";
import {onMounted, reactive, ref} from "vue";
import axios from "axios";
import Alert from "./Alert.vue";

const myLatlng = {lat: 24.95362, lng: 121.225595};
const props = defineProps(["login"])
const emits = defineEmits(["title"]);
const infoWindow = ref(null)
const coordinate = ref("")
const setName = ref("")
const alertMsg = ref("")
const alertType = ref("")
const apiStatus = ref(false)
if (props['login'] === false) {
  location.pathname = "/login.html"
}

const states = reactive({
  google: null,
  map: null,
  markers: null,
  inputX: null,
  inputY: null
});

function sendAlert(t, m) {
  alertType.value = t
  alertMsg.value = m
  setTimeout(() => {
    alertMsg.value = ""
  }, 10)
}

const resetLocation = () => {
  if (infoWindow.value) {
    infoWindow.value.close();
  }
  states.map.setCenter(myLatlng);
  states.map.setZoom(19);
  states.inputX = myLatlng["lat"];
  states.inputY = myLatlng["lng"];
  coordinate.value = myLatlng;
  infoWindow.value = new states.google.maps.InfoWindow({
    position: myLatlng,
  });
  infoWindow.value.setContent("經度：" + states.inputY + "°, 緯度：" + states.inputX + "°");
  infoWindow.value.open(states.map);
};

const getGPSLocation = () => {
  if (infoWindow.value) {
    infoWindow.value.close();
  }

  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(position => {
      const myLatlng = {
        lat: position.coords.latitude,
        lng: position.coords.longitude
      };
      states.map.setCenter(myLatlng);
      states.map.setZoom(19);
      states.inputX = myLatlng.lat;
      states.inputY = myLatlng.lng;
      coordinate.value = myLatlng;
      infoWindow.value = new states.google.maps.InfoWindow({
        position: myLatlng,
      });
      infoWindow.value.setContent("經度：" + states.inputY + "°, 緯度：" + states.inputX + "°");
      infoWindow.value.open(states.map);
    }, error => {
      console.error(error.message);
    });
  } else {
    console.error("Geolocation is not supported by this browser.");
  }
};

const createNewLocation = () => {
  apiStatus.value = true
  if (states.inputX && states.inputY) {
    axios.post("/api/location/create", {
      lat: parseFloat(states.inputX),
      lng: parseFloat(states.inputY),
      name: setName.value
    }).then((response) => {
      if (response.data.status) {
        apiStatus.value = false
        sendAlert("success", response['data']['msg']);
        setName.value = '';
        infoWindow.value.close();
        states.inputX = null;
        states.inputY = null;
      }
    }).catch(handleError);
  } else {
    apiStatus.value = false
    sendAlert("danger", "locationNotSet");
  }
};

const handleError = (error) => {
  apiStatus.value = false
  if (error.response) {
    const status = error.response.status
    if (status === 400) {
      sendAlert("danger", error.response.data["msg"]);
    } else if (status === 401) {
      sendAlert("danger", "idVerifyError");
    } else {
      sendAlert("danger", "networkError");
    }
  } else {
    sendAlert("danger", "networkError");
  }
  console.log(error)
};

const initMap = async () => {
  const pinColors = ["8DFE05", "E6FF08", "F08650", "EB3324", "B630FF"];
  const pinImages = [];
  const loader = new Loader({
    apiKey: "AIzaSyCxN-7KlK1bl2ebScPfYyax9QBpOU9bp-c",
    version: "weekly",
    libraries: ["places"],
    language: "zh-TW",
  });
  states.google = await loader.load();
  states.map = new states.google.maps.Map(document.getElementById("map"), {
    center: myLatlng,
    zoom: 19,
    mapTypeControl: false,
    fullscreenControl: false,
  });

  pinColors.forEach((item) =>
      pinImages.push(new states.google.maps.MarkerImage(`https://chart.apis.google.com/chart?chst=d_map_pin_letter&chld=%E2%80%A2|${item}`,
              new states.google.maps.Size(21, 34),
              new states.google.maps.Point(0, 0),
              new states.google.maps.Point(10, 34)
          )
      )
  );
  const pinShadow = new states.google.maps.MarkerImage(
      "https://chart.apis.google.com/chart?chst=d_map_pin_shadow",
      new states.google.maps.Size(40, 37),
      new states.google.maps.Point(0, 0),
      new states.google.maps.Point(12, 35)
  );

  axios.get('/api/aqi/search')
      .then((response) => {
        const data = response.data;
        data.forEach(function (item) {
          let pinImage;
          if (0 <= parseFloat(item["Aqi"]) && parseFloat(item["Aqi"]) < 15.5) {
            pinImage = pinImages[0];
          } else if (15.5 <= parseFloat(item["Aqi"]) && parseFloat(item["Aqi"]) < 35.4) {
            pinImage = pinImages[1];
          } else if (15.5 <= parseFloat(item["Aqi"]) && parseFloat(item["Aqi"]) < 54.4) {
            pinImage = pinImages[2];
          } else if (54.4 <= parseFloat(item["Aqi"]) && parseFloat(item["Aqi"]) < 150.4) {
            pinImage = pinImages[3];
          } else if (parseFloat(item["Aqi"]) >= 150.4) {
            pinImage = pinImages[4];
          }
          new states.google.maps.Marker({
            position: {
              lat: Number(item["Location"].match(/\((.*),(.*)\)/)[1]),
              lng: Number(item["Location"].match(/\((.*),(.*)\)/)[2])
            },
            map: states.map,
            title: "AQI：" + item["Aqi"],
            icon: pinImage,
            shadow: pinShadow
          });
        });
      })
      .catch(function (error) {
        console.log(error);
      });

  const searchBox = new states.google.maps.places.SearchBox(
      document.getElementById("search-box")
  );

  searchBox.addListener("places_changed", () => {
    const places = searchBox.getPlaces();
    if (places.length === 0) {
      return;
    }

    // 取得搜尋的地點並在地圖上標記
    const bounds = new states.google.maps.LatLngBounds();
    places.forEach((place) => {
      if (!place.geometry || !place.geometry.location) {
        console.log("返回的地點沒有包含地理資訊");
        return;
      }
      coordinate.value = `{ "lat": ${place.geometry.location.lat()}, "lng": ${place.geometry.location.lng()} }`;
      if (infoWindow.value) {
        infoWindow.value.close();
      }
      infoWindow.value = new states.google.maps.InfoWindow({
        position: place.geometry.location,
      });
      states.inputX = place.geometry.location.lat().toFixed(6);
      states.inputY = place.geometry.location.lng().toFixed(6);
      infoWindow.value.setContent("經度：" + place.geometry.location.lng().toFixed(6) + "°," +
          " 緯度：" + place.geometry.location.lat().toFixed() + "°");
      infoWindow.value.open(states.map);

      if (place.geometry.viewport) {
        bounds.union(place.geometry.viewport);
      } else {
        bounds.extend(place.geometry.location);
      }
    });

    // 移動地圖到搜尋到的地點
    states.map.fitBounds(bounds);
    states.map.setZoom(19);
  });


  states.map.addListener("click", ({latLng}) => {
    const {lat, lng} = latLng.toJSON();

    states.inputX = lat;
    states.inputY = lng;
    if (infoWindow.value) {
      infoWindow.value.close();
    }

    infoWindow.value = new states.google.maps.InfoWindow({
      position: latLng,
      content: `經度：${lng.toFixed(6)}°, 緯度：${lat.toFixed(6)}°`
    });

    infoWindow.value.open(states.map);
    console.log(infoWindow.value)
  });
};


onMounted(() => {
  emits("title", "map");
  setTimeout(() => {
    initMap();
  }, 100)
  console.log("⡆⣐⢕⢕⢕⢕⢕⢕⢕⢕⠅⢗⢕⢕⢕⢕⢕⢕⢕⠕⠕⢕⢕⢕⢕⢕⢕⢕⢕⢕\n⢐⢕⢕⢕⢕⢕⣕⢕⢕⠕⠁⢕⢕⢕⢕⢕⢕⢕⢕⠅⡄⢕⢕⢕⢕⢕⢕⢕⢕⢕\n⢕⢕⢕⢕⢕⠅⢗⢕⠕⣠⠄⣗⢕⢕⠕⢕⢕⢕⠕⢠⣿⠐⢕⢕⢕⠑⢕⢕⠵⢕\n⢕⢕⢕⢕⠁⢜⠕⢁⣴⣿⡇⢓⢕⢵⢐⢕⢕⠕⢁⣾⢿⣧⠑⢕⢕⠄⢑⢕⠅⢕\n⢕⢕⠵⢁⠔⢁⣤⣤⣶⣶⣶⡐⣕⢽⠐⢕⠕⣡⣾⣶⣶⣶⣤⡁⢓⢕⠄⢑⢅⢑\n⠍⣧⠄⣶⣾⣿⣿⣿⣿⣿⣿⣷⣔⢕⢄⢡⣾⣿⣿⣿⣿⣿⣿⣿⣦⡑⢕⢤⠱⢐\n⢠⢕⠅⣾⣿⠋⢿⣿⣿⣿⠉⣿⣿⣷⣦⣶⣽⣿⣿⠈⣿⣿⣿⣿⠏⢹⣷⣷⡅⢐\n⣔⢕⢥⢻⣿⡀⠈⠛⠛⠁⢠⣿⣿⣿⣿⣿⣿⣿⣿⡀⠈⠛⠛⠁⠄⣼⣿⣿⡇⢔\n⢕⢕⢽⢸⢟⢟⢖⢖⢤⣶⡟⢻⣿⡿⠻⣿⣿⡟⢀⣿⣦⢤⢤⢔⢞⢿⢿⣿⠁⢕\n⢕⢕⠅⣐⢕⢕⢕⢕⢕⣿⣿⡄⠛⢀⣦⠈⠛⢁⣼⣿⢗⢕⢕⢕⢕⢕⢕⡏⣘⢕\n⢕⢕⠅⢓⣕⣕⣕⣕⣵⣿⣿⣿⣾⣿⣿⣿⣿⣿⣿⣿⣷⣕⢕⢕⢕⢕⡵⢀⢕⢕\n⢑⢕⠃⡈⢿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⢃⢕⢕⢕\n⣆⢕⠄⢱⣄⠛⢿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⠿⢁⢕⢕⠕⢁\n⣿⣦⡀⣿⣿⣷⣶⣬⣍⣛⣛⣛⡛⠿⠿⠿⠛⠛⢛⣛⣉⣭⣤⣂⢜⠕⢑⣡⣴⣿\n")
  console.log('%c等一下！', 'color: #5865f2; padding: 10px; font-size: 66px; text-shadow: 0 0 5px #000;');
  console.log('%c如果有人叫您在這裡複製/貼上任何東西，您百分之百被騙了。', 'color: #fff; font-size: 16px; padding: 10px;');
  console.log('%c在這裡貼上任何資訊，均有可能讓惡意攻擊者存取您的 監測系統 的帳號。', 'color: #ff0000; font-size: 16px; font-weight: bold; padding: 10px;');

});
</script>

<style scoped>
#map {
  height: 70vh;
}
</style>