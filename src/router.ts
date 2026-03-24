import { createRouter, createWebHistory, type RouteLocationNormalized } from "vue-router"
import BoardView from "@/features/boards/views/BoardView.vue"
import LoginView from "@/features/auth/views/LoginView.vue"
import RegisterView from "@/features/auth/views/RegisterView.vue"
import HomeView from "@/features/boards/views/HomeView.vue"
import AdminView from "@/features/admin/views/AdminView.vue"
import { useAuthStore } from "@/features/auth/stores/authStore"
import AdminUserView from "@/features/admin/views/AdminUserView.vue"
import { useAdminStore } from "@/features/admin/stores/admin.store"
import AdminUserBoardView from "@/features/admin/views/AdminUserBoardView.vue"
import { useBoardStore } from "@/features/boards/stores/board.store"
import BannedView from "@/features/auth/views/BannedView.vue"

async function requireAdmin(to: RouteLocationNormalized, from: RouteLocationNormalized) {
    const auth = useAuthStore()

    if (!auth.isAdmin) {
        if (from.fullPath && from.fullPath !== to.fullPath) {
            return from.fullPath
        }

        return "/"
    }

    const adminStore = useAdminStore()
    await adminStore.ensureUsersAreLoaded()

    return true
}

function handleBeforeEnter(to: RouteLocationNormalized): boolean | string {
    const auth = useAuthStore()

    if (to.path !== "/") {
        if (auth.isAuthenticated && !auth.isEmailVerified) return "/"
    }

    if (to.path === "/banned") {
        if (!auth.isAuthenticated) return "/"

        return true
    }

    if (auth.isUserBanned) {
        return "/banned"
    }

    return true
}

const routes = [
    {
        path: "/admin/user/:userId/board/:boardId",
        name: "admin/user/board",
        component: AdminUserBoardView,
        beforeEnter: [
            requireAdmin,
            (to: RouteLocationNormalized) => {
                const boardStore = useBoardStore()
                return boardStore.ensureBoardIsLoaded(Number(to.params.boardId))
            },
        ],
    },
    {
        path: "/admin/user/:id",
        name: "admin/user",
        component: AdminUserView,
        beforeEnter: requireAdmin,
    },
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
        path: "/banned",
        name: "banned",
        component: BannedView,
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

router.beforeEach(handleBeforeEnter)

export default router
