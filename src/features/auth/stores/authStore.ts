import type { LoginFormData, RegisterFormData, User } from "@/features/auth/models"
import { defineStore } from "pinia"
import { ref } from "vue"
import business from "@/features/auth/services/auth.application"

export const useAuthStore = defineStore("auth", () => {
    const user = ref<User | null>(null)

    const logIn = (data: LoginFormData) => {
        business.login(data).then((res) => {
            console.log(res)
        })
    }

    const register = (data: RegisterFormData) => {
        business.register(data).then((res) => {
            console.log(res)
        })
    }

    return { user, logIn, register }
})
