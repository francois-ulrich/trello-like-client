import type { LoginFormData, RegisterFormData, User } from "@/features/auth/models"
import { defineStore } from "pinia"
import { ref } from "vue"
import business from "@/features/auth/services/auth.application"

export const useAuthStore = defineStore("auth", () => {
    const user = ref<User | null>(null)

    const register = (data: RegisterFormData) => {
        business.register(data).then((res) => {
            console.log(res)
            user.value = res.data.data.user
        })
    }

    const login = (data: LoginFormData) => {
        business.login(data).then((res) => {
            user.value = res.data.data.user
        })
    }

    const logout = () => {
        business.logout().then(() => {
            user.value = null
        })
    }

    return { user, register, login, logout }
})
