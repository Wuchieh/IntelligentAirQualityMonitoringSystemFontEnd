import {createApp} from 'vue'
import Login from './Login.vue'
import {createI18n} from "vue-i18n";
import tw from "../../i18n/zh-TW.json";
import en from "../../i18n/en.json";


const i18n = createI18n({
    legacy: false,
    locale: localStorage.getItem("locale") ?? "zh-TW",
    fallbackLocale: "zh-TW",
    messages: {
        "zh-TW": tw,
        "en-US": en,
    }
});
const app = createApp(Login)
app.use(i18n)
app.mount('#app')
