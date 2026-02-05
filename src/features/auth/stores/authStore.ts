import type { LoginFormData, RegisterFormData, User } from "@/features/auth/models"
import { defineStore } from "pinia"
import { computed, ref } from "vue"
import business from "@/features/auth/services/auth.application"

export const useAuthStore = defineStore("auth", () => {
    const user = ref<User | null>(null)
    const isAuthenticated = computed(() => user.value !== null)

    const fetchMe = async () => {
        try {
            const res = await business.getMe()
            user.value = res.data.user
        } catch {
            user.value = null
        }
    }

    const register = async (data: RegisterFormData) => {
        const res = await business.register(data)
        user.value = res.data.user
    }

    const login = async (data: LoginFormData) => {
        const res = await business.login(data)
        user.value = res.data.user
    }

    const logout = async () => {
        await business.logout()
        user.value = null
    }

    const initialize = async () => {
        await fetchMe()
    }

    return { isAuthenticated, user, initialize, register, login, logout }
})
