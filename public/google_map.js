let x, y;
let coordinate_P = document.getElementById("coordinate");
let myLatlng = { lat: 24.95391, lng: 121.22619 };

let inputX = document.getElementById("x"), inputY = document.getElementById("y");
inputX.value = myLatlng["lat"];
inputY.value = myLatlng["lng"];
while (coordinate_P == null) {
    coordinate_P = document.getElementById("coordinate");
}

function initMap() { //初始化地圖
    const pinColors = ["8DFE05", "E6FF08", "F08650", "EB3324", "B630FF"]
    const pinImages = []
    pinColors.forEach(item => pinImages.push(new google.maps.MarkerImage("http://chart.apis.google.com/chart?chst=d_map_pin_letter&chld=%E2%80%A2|" + item, new google.maps.Size(21, 34), new google.maps.Point(0, 0), new google.maps.Point(10, 34))));
    const pinShadow = new google.maps.MarkerImage("http://chart.apis.google.com/chart?chst=d_map_pin_shadow",
        new google.maps.Size(40, 37),
        new google.maps.Point(0, 0),
        new google.maps.Point(12, 35));

    const xhr = new XMLHttpRequest();
    xhr.open('GET', 'https://www.wuchieh.com/api/search');
    xhr.responseType = 'json';
    xhr.send();
    xhr.onload = function () {
        const data = xhr.response;
        data["data"].forEach(function (item, i) {
            let pinImage;
            if (0 <= parseFloat(item["aql"]) && parseFloat(item["aql"]) < 15.5) {
                pinImage = pinImages[0];
            } else if (15.5 <= parseFloat(item["aql"]) && parseFloat(item["aql"]) < 35.4) {
                pinImage = pinImages[1];
            } else if (15.5 <= parseFloat(item["aql"]) && parseFloat(item["aql"]) < 54.4) {
                pinImage = pinImages[2];
            } else if (54.4 <= parseFloat(item["aql"]) && parseFloat(item["aql"]) < 150.4) {
                pinImage = pinImages[3];
            } else if (parseFloat(item["aql"]) >= 35.4) {
                pinImage = pinImages[4];
            }
            new google.maps.Marker({
                position: { lat: Number(item["x"]), lng: Number(item["y"]) },
                map,
                title: "AQI：" + item["aql"],
                icon: pinImage,
                shadow: pinShadow
            });
        });
    };

    x = myLatlng["lat"];
    y = myLatlng["lng"];
    const map = new google.maps.Map(document.getElementById("map"), {
        zoom: 19,
        center: myLatlng,
    });
    // Create the initial InfoWindow.
    let infoWindow = new google.maps.InfoWindow({
        content: "點擊地圖以獲得緯度/位置!",
        position: myLatlng,
    });

    infoWindow.open(map);
    // Configure the click listener.
    map.addListener("click", (mapsMouseEvent) => {
        infoWindow.close();
        infoWindow = new google.maps.InfoWindow({
            position: mapsMouseEvent.latLng,
        });

        inputX.value = x = mapsMouseEvent.latLng.toJSON()["lat"];
        inputY.value = y = mapsMouseEvent.latLng.toJSON()["lng"];

        infoWindow.setContent("經度:" + y.toFixed(5) + ", 緯度:" + x.toFixed(5));
        infoWindow.open(map);

    });
    // Seach Box ----------------------------------------
    const searchInput = document.getElementById("pac-input");
    const searchBox = new google.maps.places.SearchBox(searchInput);
    map.controls[google.maps.ControlPosition.TOP_LEFT].push(searchInput);
    // 將搜尋框的結果偏向目前地圖口
    map.addListener("bounds_changed", () => {
        searchBox.setBounds(map.getBounds());
    });

    // let markers = [];

    // 偵聽用戶選擇預測並檢索時觸發的事件
    // 那個地方的更多細節。
    searchBox.addListener("places_changed", () => {
        const places = searchBox.getPlaces();

        if (places.length == 0) {
            return;
        }

        // 對於每個地點，獲取圖標、名稱和位置。
        const bounds = new google.maps.LatLngBounds();

        places.forEach((place) => {
            if (!place.geometry || !place.geometry.location) {
                console.log("Returned place contains no geometry");
                return;
            }
            if (place.geometry.viewport) {
                // 只有地理編碼有視口。
                bounds.union(place.geometry.viewport);
            } else {
                bounds.extend(place.geometry.location);
            }
            inputX.value = lat = place.geometry.location.toJSON()["lat"]
            inputY.value = lng = place.geometry.location.toJSON()["lng"]
            // Close the current InfoWindow.
            infoWindow.close();
            // Create a new InfoWindow.
            infoWindow = new google.maps.InfoWindow({
                position: place.geometry.location,
            });
            infoWindow.setContent("經度:" + lng.toFixed(5) + ", 緯度:" + lat.toFixed(5));
            infoWindow.open(map);
        });
        map.fitBounds(bounds);
    });
}

function get_xy() { //取得經緯度
    coordinate_P.innerHTML = "Latitude: " + x +
        "<br>Longitude: " + y;
}

function getLocation() { //取得位置
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(showPosition, function () {
            coordinate_P.innerHTML = "Geolocation is not supported by this browser.";
        });
    } else {
        coordinate_P.innerHTML = "Geolocation is not supported by this browser.";
    }
}

function showPosition(position) { //顯示目前位置
    coordinate_P.innerHTML = "Latitude: " + position.coords.latitude +
        "<br>Longitude: " + position.coords.longitude;
    myLatlng = { lat: position.coords.latitude, lng: position.coords.longitude };
    inputX.value = position.coords.latitude;
    inputY.value = position.coords.longitude;
    initMap();
}

function resetLocation() { //重設初始位置
    myLatlng = { lat: 24.95391, lng: 121.22619 };
    initMap();
    inputX.value = myLatlng["lat"];
    inputY.value = myLatlng["lng"];
    coordinate_P.innerHTML = "Latitude: " + x +
        "<br>Longitude: " + y;
}