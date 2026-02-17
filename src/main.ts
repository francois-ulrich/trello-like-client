import { createApp } from "vue"
import { createPinia } from "pinia"
import "./style.css"
import App from "./App.vue"
// import { createLocalStoragePlugin } from "@/plugins/localStoragePlugin"
import router from "@/router"

const app = createApp(App)

const pinia = createPinia()

// pinia.use(createLocalStoragePlugin({ ignoredStores: ["auth"] }))
app.use(pinia)

app.use(router)

app.mount("#app")
