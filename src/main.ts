import { createApp } from "vue"
import { createPinia } from "pinia"
import "./style.css"
import App from "./App.vue"
import { createLocalStoragePlugin } from "@/plugins/localStoragePlugin"
import router from "@/router"
import { useAuthStore } from "@/features/auth/stores/authStore"
import { useBoardStore } from "@/features/boards/stores/board.store"
import PrimeVue from "primevue/config"

const app = createApp(App)
const pinia = createPinia()

pinia.use(createLocalStoragePlugin({ ignoredStores: ["auth"] }))
app.use(pinia)

const authStore = useAuthStore()
const boardStore = useBoardStore()

await authStore.initialize()

if (authStore.isAuthenticated && !authStore.isUserBanned) boardStore.loadAll()

app.use(router)
app.use(PrimeVue)

app.mount("#app")
