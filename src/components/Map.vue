<template>
	<Alert :alert-message="alertMsg" :alert-type="alertType" />
	<div class="container" v-if="login">
		<div class="row">
			<input id="search-box" class="controls" type="text" :placeholder="$t('search')" />
			<div id="map"></div>
			<div class="row gy-1" id="button">
				<div>
					<input type="text" maxLength="16" :placeholder="$t('plsEnterName')" v-model="setName"
						class="me-2" />
					<button type="button" class="btn btn-secondary" @click="createNewLocation" :disabled="apiStatus">
						{{ $t("confirm") }}
					</button>
				</div>
				<div class="gy-1 mb-5 d-flex">
					<button class="btn btn-secondary mx-1" @click="getGPSLocation">
						{{ $t("positioning") }}
					</button>
					<button class="btn btn-secondary mx-1" @click="resetLocation">
						{{ $t("resetPositioning") }}
					</button>
				</div>
				<p style="height: 20px" id="coordinate" class="d-none">
					{{ coordinate }}
				</p>
			</div>
		</div>
	</div>
</template>

<script setup>
import { Loader } from "@googlemaps/js-api-loader";
import { onMounted, reactive, ref } from "vue";
import axios from "axios";
import Alert from "./Alert.vue";

const myLatlng = { lat: 24.953573, lng: 121.225634 };
const props = defineProps(["login"]);
const emits = defineEmits(["title"]);
const infoWindow = ref(null);
const coordinate = ref("");
const setName = ref("");
const alertMsg = ref("");
const alertType = ref("");
const apiStatus = ref(false);
if (props["login"] === false) {
	location.pathname = "/login.html";
}

const states = reactive({
	google: null,
	map: null,
	markers: null,
	inputX: null,
	inputY: null,
});

function sendAlert(t, m) {
	alertType.value = t;
	alertMsg.value = m;
	setTimeout(() => {
		alertMsg.value = "";
	}, 10);
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
		content: `
			<div class="mt-2">
					<p class="m-0">經度：${myLatlng.lng.toFixed(6)}°, 緯度：${myLatlng.lat.toFixed(6)}°</p>
			</div>
`,
	});
	infoWindow.value.open(states.map);
};

const getGPSLocation = () => {
	if (infoWindow.value) {
		infoWindow.value.close();
	}

	if (navigator.geolocation) {
		navigator.geolocation.getCurrentPosition(
			(position) => {
				const myLatlng = {
					lat: position.coords.latitude,
					lng: position.coords.longitude,
				};
				states.map.setCenter(myLatlng);
				states.map.setZoom(19);
				states.inputX = myLatlng.lat;
				states.inputY = myLatlng.lng;
				coordinate.value = myLatlng;
				infoWindow.value = new states.google.maps.InfoWindow({
					position: myLatlng,
					content: `
					<div class="mt-2">
							<p class="m-0">經度：${myLatlng.lng.toFixed(6)}°, 緯度：${myLatlng.lat.toFixed(6)}°</p>
					</div>
					`,
				});
				infoWindow.value.open(states.map);
			},
			(error) => {
				console.error(error.message);
			}
		);
	} else {
		console.error("Geolocation is not supported by this browser.");
	}
};

const createNewLocation = () => {
	apiStatus.value = true;
	if (states.inputX && states.inputY) {
		axios
			.post("/api/location/create", {
				lat: parseFloat(states.inputX),
				lng: parseFloat(states.inputY),
				name: setName.value,
			})
			.then((response) => {
				if (response.data.status) {
					apiStatus.value = false;
					sendAlert("success", response["data"]["msg"]);
					setName.value = "";
					if (infoWindow.value) {
						infoWindow.value.close();
					}
					states.inputX = null;
					states.inputY = null;
				}
			})
			.catch(handleError);
	} else {
		apiStatus.value = false;
		sendAlert("danger", "locationNotSet");
	}
};

const handleError = (error) => {
	apiStatus.value = false;
	if (error.response) {
		const status = error.response.status;
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
	console.log(error);
};

const initMap = async () => {
	const loader = new Loader({
		apiKey: "YOUR_API_KEY",
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

	const getColorForAqi = (aqi) => {
		const value = parseFloat(aqi);
		if (value >= 150.4) {
			return "purple";
		} else if (value >= 54.4) {
			return "red";
		} else if (value >= 35.4) {
			return "orange";
		} else if (value >= 15.5) {
			return "yellow";
		} else {
			return "green";
		}
	};

	const createMarker = (position, aqi) => {
		const color = getColorForAqi(aqi);
		const marker = new states.google.maps.Marker({
			position: position,
			map: states.map,
			icon: {
				url: `http://maps.google.com/mapfiles/ms/icons/${color}-dot.png`,
			},
			title: `AQI：${aqi}`,
		});
		createMarkerInfoWindow(marker, aqi);
	};

	const createMarkerInfoWindow = (marker, aqi) => {
		const status = getStatus(aqi);
		const content = `
            <button class="close-button" style="position: absolute; top: 5px; right: 5px; border: none; background: transparent; cursor: pointer;">Ｘ</button>
            <div class="mt-3">
                AQI: ${aqi}<br>狀態: ${status}
            </div>
    `;

		const infoWindow = new states.google.maps.InfoWindow({
			content: content,
		});

		marker.addListener("click", () => {
			infoWindow.open(states.map, marker);

			// 在 InfoWindow 打開後，使用 DOM ready 事件來獲取內容並綁定按鈕
			google.maps.event.addListenerOnce(infoWindow, 'domready', () => {
				// 確保 InfoWindow 的 DOM 已經準備好
				const iwOuter = document.querySelector('.gm-style-iw');
				console.log(iwOuter);  // 確認是否找到正確的元素

				// 使用 querySelector 查找自定義的關閉按鈕
				const closeButton = iwOuter.querySelector(".close-button");
				console.log(closeButton);  // 確認是否找到按鈕

				// 綁定按鈕事件
				if (closeButton) {
					closeButton.addEventListener("click", () => {
						infoWindow.close();
						console.log("InfoWindow 關閉");
					});
				}
			});
		});
	};

	const getStatus = (avg) => {
		const value = parseFloat(avg);
		if (value >= 150.4) {
			return "危險";
		} else if (value >= 54.4) {
			return "非常不好";
		} else if (value >= 35.4) {
			return "不好";
		} else if (value >= 15.5) {
			return "正常";
		} else {
			return "良好";
		}
	};

	axios
		.get("/api/aqi/search")
		.then((response) => {
			const data = response.data;
			data.forEach(function (item) {
				const locationMatch = item["Location"].match(/\((.*),(.*)\)/);
				if (locationMatch) {
					const position = {
						lat: Number(locationMatch[1]),
						lng: Number(locationMatch[2]),
					};
					createMarker(position, item["Aqi"]);
				}
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
				content: `
							<div class="mt-2">
									經度：${place.geometry.location.lng().toFixed(6)}°, 緯度：${place.geometry.location.lat().toFixed(6)}°
							</div>
	`,
			});
			states.inputX = place.geometry.location.lat().toFixed(6);
			states.inputY = place.geometry.location.lng().toFixed(6);
			infoWindow.value.open(states.map);

			if (place.geometry.viewport) {
				bounds.union(place.geometry.viewport);
			} else {
				bounds.extend(place.geometry.location);
			}
		});

		states.map.fitBounds(bounds);
		states.map.setZoom(19);
	});

	// 处理地图点击事件
	states.map.addListener("click", ({ latLng }) => {
		const { lat, lng } = latLng.toJSON();

		states.inputX = lat;
		states.inputY = lng;
		if (infoWindow.value) {
			infoWindow.value.close();
		}

		infoWindow.value = new states.google.maps.InfoWindow({
			position: latLng,
			content: `
					<div class="mt-2">
							經度：${lng.toFixed(6)}°, 緯度：${lat.toFixed(6)}°
					</div>
					`,
		});

		infoWindow.value.open(states.map);
		console.log(infoWindow.value);
	});
};

onMounted(() => {
	emits("title", "map");
	setTimeout(() => {
		initMap();
	}, 100);
	console.log(
		"⡆⣐⢕⢕⢕⢕⢕⢕⢕⢕⠅⢗⢕⢕⢕⢕⢕⢕⢕⠕⠕⢕⢕⢕⢕⢕⢕⢕⢕⢕\n⢐⢕⢕⢕⢕⢕⣕⢕⢕⠕⠁⢕⢕⢕⢕⢕⢕⢕⢕⠅⡄⢕⢕⢕⢕⢕⢕⢕⢕⢕\n⢕⢕⢕⢕⢕⠅⢗⢕⠕⣠⠄⣗⢕⢕⠕⢕⢕⢕⠕⢠⣿⠐⢕⢕⢕⠑⢕⢕⠵⢕\n⢕⢕⢕⢕⠁⢜⠕⢁⣴⣿⡇⢓⢕⢵⢐⢕⢕⠕⢁⣾⢿⣧⠑⢕⢕⠄⢑⢕⠅⢕\n⢕⢕⠵⢁⠔⢁⣤⣤⣶⣶⣶⡐⣕⢽⠐⢕⠕⣡⣾⣶⣶⣶⣤⡁⢓⢕⠄⢑⢅⢑\n⠍⣧⠄⣶⣾⣿⣿⣿⣿⣿⣿⣷⣔⢕⢄⢡⣾⣿⣿⣿⣿⣿⣿⣿⣦⡑⢕⢤⠱⢐\n⢠⢕⠅⣾⣿⠋⢿⣿⣿⣿⠉⣿⣿⣷⣦⣶⣽⣿⣿⠈⣿⣿⣿⣿⠏⢹⣷⣷⡅⢐\n⣔⢕⢥⢻⣿⡀⠈⠛⠛⠁⢠⣿⣿⣿⣿⣿⣿⣿⣿⡀⠈⠛⠛⠁⠄⣼⣿⣿⡇⢔\n⢕⢕⢽⢸⢟⢟⢖⢖⢤⣶⡟⢻⣿⡿⠻⣿⣿⡟⢀⣿⣦⢤⢤⢔⢞⢿⢿⣿⠁⢕\n⢕⢕⠅⣐⢕⢕⢕⢕⢕⣿⣿⡄⠛⢀⣦⠈⠛⢁⣼⣿⢗⢕⢕⢕⢕⢕⢕⡏⣘⢕\n⢕⢕⠅⢓⣕⣕⣕⣕⣵⣿⣿⣿⣾⣿⣿⣿⣿⣿⣿⣿⣷⣕⢕⢕⢕⢕⡵⢀⢕⢕\n⢑⢕⠃⡈⢿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⢃⢕⢕⢕\n⣆⢕⠄⢱⣄⠛⢿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⠿⢁⢕⢕⠕⢁\n⣿⣦⡀⣿⣿⣷⣶⣬⣍⣛⣛⣛⡛⠿⠿⠿⠛⠛⢛⣛⣉⣭⣤⣂⢜⠕⢑⣡⣴⣿\n"
	);
	console.log(
		"%c等一下！",
		"color: #5865f2; padding: 10px; font-size: 66px; text-shadow: 0 0 5px #000;"
	);
	console.log(
		"%c如果有人叫您在這裡複製/貼上任何東西，您百分之百被騙了。",
		"color: #fff; font-size: 16px; padding: 10px;"
	);
	console.log(
		"%c在這裡貼上任何資訊，均有可能讓惡意攻擊者存取您的 監測系統 的帳號。",
		"color: #ff0000; font-size: 16px; font-weight: bold; padding: 10px;"
	);
});
</script>

<style scoped>
#map {
	height: 70vh;
}
</style>

<style>
.gm-style-iw-chr {
	display: none;
	/* 隱藏所有的 InfoWindow */
}
</style>
