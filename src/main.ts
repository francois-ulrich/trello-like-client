import { createApp } from "vue"
import { createPinia } from "pinia"
import "./style.css"
import App from "./App.vue"
import { createLocalStoragePlugin } from "@/plugins/localStoragePlugin"
import router from "@/router"
import { useAuthStore } from "@/features/auth/stores/authStore"
import PrimeVue from "primevue/config"
import { useApiBoardStore } from "@/features/boards/stores/board.store.api"
import { useLocalBoardStore } from "@/features/boards/stores/board.store.local"
const app = createApp(App)
const pinia = createPinia()

pinia.use(createLocalStoragePlugin({ persistedStores: ["boardLocal", "columnLocal", "cardLocal"] }))
app.use(pinia)

const authStore = useAuthStore()
const apiBoardStore = useApiBoardStore()
const localBoardStore = useLocalBoardStore()

await authStore.initialize()

if (authStore.isAuthenticated && !authStore.isUserBanned) {
    apiBoardStore.loadAll()
}
localBoardStore.loadAll()

app.use(router)
app.use(PrimeVue)

app.mount("#app")
