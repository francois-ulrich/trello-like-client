import type { User } from "@/features/auth/models"
import { defineStore } from "pinia"
import { computed, ref } from "vue"
import type {
    ForgotPasswordRequestDTO,
    LoginRequestDTO,
    RegisterRequestDTO,
    ResetPasswordRequestDTO,
} from "@/features/auth/infrastructure/auth.request.dto"
import type { UserResponseDTO } from "@/features/auth/infrastructure/auth.response.dto"
import { authApi } from "@/features/auth/infrastructure/auth.api"
import { useApiBoardStore } from "@/features/boards/stores/board.store.api"

export const useAuthStore = defineStore("auth", () => {
    const user = ref<User | null>(null)
    const isAuthenticated = computed<boolean>(() => user.value !== null)
    const isAdmin = computed<boolean>(() => user.value?.role === "admin")
    const isUserBanned = computed<boolean>(() =>
        user.value !== null ? user.value.isBanned : false,
    )
    const isEmailVerified = computed<boolean>(() =>
        user.value !== null ? user.value.emailIsVerified : false,
    )
    const showVerifiedMessage = ref<boolean>(false)

    const boardStore = useApiBoardStore()
    const columnStore = useApiBoardStore()
    const cardStore = useApiBoardStore()

    const fetchMe = async () => {
        try {
            const res = await authApi.fetchMe()
            persistUser(res.data)
        } catch {
            user.value = null
        }
    }

    const can = (role: string) => {
        return user.value?.role === role
    }

    const register = async (data: RegisterRequestDTO) => {
        const res = await authApi.register(data)
        persistUser(res.data)
    }

    const login = async (data: LoginRequestDTO) => {
        const res = await authApi.login(data)
        persistUser(res.data)

        boardStore.loadAll()
    }

    const persistUser = (data: UserResponseDTO) => {
        const userToPersist = buildUserFromDTO(data)
        if (userToPersist !== null) user.value = userToPersist
    }

    const logout = async () => {
        await authApi.logout()
        user.value = null

        boardStore.items = []
        columnStore.items = []
        cardStore.items = []

        showVerifiedMessage.value = false
    }

    const initialize = async () => {
        await fetchMe()
    }

    const buildUserFromDTO = (dto: UserResponseDTO): User => {
        const { name, email, role, isBanned, emailIsVerified } = dto.user
        return { name, email, role, isBanned, emailIsVerified }
    }

    const sendVerificationEmail = async () => {
        const res = await authApi.sendVerificationEmail()
        return res
    }

    const sendPasswordChangeEmail = async (dto: ForgotPasswordRequestDTO) => {
        const res = await authApi.sendPasswordChangeEmail(dto)
        return res
    }

    const resetPassword = async (dto: ResetPasswordRequestDTO) => {
        const res = await authApi.resetPassword(dto)
        return res
    }

    return {
        isAuthenticated,
        isAdmin,
        isUserBanned,
        isEmailVerified,
        showVerifiedMessage,
        user,
        initialize,
        register,
        login,
        logout,
        can,
        sendVerificationEmail,
        sendPasswordChangeEmail,
        resetPassword,
    }
})
