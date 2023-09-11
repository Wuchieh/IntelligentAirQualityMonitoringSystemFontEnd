import {createApp} from 'vue'
import App from './App.vue'
import Index from "./components/Index.vue";
import {createI18n} from "vue-i18n";
import {createRouter, createWebHistory} from "vue-router";
import tw from "./i18n/zh-TW.json"
import en from "./i18n/en.json"
import Learn from "./components/Learn.vue";
import GoogleMap from "./components/Map.vue";
import Setting from "./components/Setting.vue";
import sendMessage from "./components/SendMessage.vue";
import "default-passive-events";

const routes = [
    {path: '/', component: Index},
    {path: '/learn', component: Learn},
    {path: '/map', component: GoogleMap},
    {path: '/learn', component: Learn},
    {path: '/setting', component: Setting},
    {path: '/sendmsg', component: sendMessage},
]

const router = createRouter({
    history: createWebHistory(),
    routes,
})

const i18n = createI18n({
    legacy: false,
    locale: localStorage.getItem("locale") ?? "zh-TW",
    fallbackLocale: "zh-TW",
    messages: {
        "zh-TW": tw,
        "en-US": en,
    }
});

const app = createApp(App)
app.use(router)
app.use(i18n)
app.mount('#app')
