import { createApp } from "vue"
import { createPinia } from "pinia"
import "./style.css"
import App from "./App.vue"
import localStoragePlugin from "@/plugins/localStoragePlugin"

const pinia = createPinia()
pinia.use(localStoragePlugin)
const app = createApp(App)

app.use(pinia)
app.mount("#app")
