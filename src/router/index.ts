import { createRouter, createWebHistory } from "vue-router"
import HomeView from "@/views/Home/HomeView.vue"
import BoardView from "@/views/Board/BoardView.vue"

const routes = [
    {
        path: "/board/:id",
        name: "board",
        component: BoardView,
    },
    {
        path: "/",
        name: "home",
        component: HomeView,
    },
]

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes,
})

export default router
