import { createApp } from "vue"
import { createPinia } from "pinia"
import "./style.css"
import App from "./App.vue"
import localStoragePlugin from "@/plugins/localStoragePlugin"
import router from "@/router"

const app = createApp(App)

const pinia = createPinia()
pinia.use(localStoragePlugin)
app.use(pinia)

app.use(router)

app.mount("#app")
