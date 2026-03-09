import { createRouter, createWebHistory, type RouteLocationNormalized } from "vue-router"
import BoardView from "@/features/boards/views/BoardView.vue"
import LoginView from "@/features/auth/views/LoginView.vue"
import RegisterView from "@/features/auth/views/RegisterView.vue"
import HomeView from "@/features/boards/views/HomeView.vue"
import AdminView from "@/features/admin/views/AdminView.vue"
import { useAuthStore } from "@/features/auth/stores/authStore"

function requireAdmin(to: RouteLocationNormalized, from: RouteLocationNormalized) {
    const auth = useAuthStore()

    if (!auth.isAdmin) {
        if (from.fullPath && from.fullPath !== to.fullPath) {
            return from.fullPath
        }

        return "/"
    }

    return true
}

const routes = [
    {
        path: "/admin",
        name: "admin",
        component: AdminView,
        beforeEnter: requireAdmin,
    },
    {
        path: "/board/:id",
        name: "board",
        component: BoardView,
    },
    {
        path: "/login",
        name: "login",
        component: LoginView,
    },
    {
        path: "/register",
        name: "register",
        component: RegisterView,
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
