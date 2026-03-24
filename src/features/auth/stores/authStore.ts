import type { User } from "@/features/auth/models"
import { defineStore } from "pinia"
import { computed, ref } from "vue"
import business from "@/features/auth/services/auth.application"
import { useBoardStore } from "@/features/boards/stores/board.store"
import { useColumnStore } from "@/features/columns/stores/column.store"
import { useCardStore } from "@/features/cards/stores/card.store"
import type {
    LoginRequestDTO,
    RegisterRequestDTO,
} from "@/features/auth/infrastructure/auth.request.dto"
import type { UserResponseDTO } from "@/features/auth/infrastructure/auth.response.dto"

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

    const boardStore = useBoardStore()
    const columnStore = useColumnStore()
    const cardStore = useCardStore()

    const fetchMe = async () => {
        try {
            const res = await business.getMe()
            persistUser(res.data)
        } catch {
            user.value = null
        }
    }

    const can = (role: string) => {
        return user.value?.role === role
    }

    const register = async (data: RegisterRequestDTO) => {
        const res = await business.register(data)
        persistUser(res.data)
    }

    const login = async (data: LoginRequestDTO) => {
        const res = await business.login(data)
        persistUser(res.data)

        boardStore.loadAll()
    }

    const persistUser = (data: UserResponseDTO) => {
        const userToPersist = buildUserFromDTO(data)
        if (userToPersist !== null) user.value = userToPersist
    }

    const logout = async () => {
        await business.logout()
        user.value = null

        boardStore.items = []
        columnStore.items = []
        cardStore.items = []
    }

    const initialize = async () => {
        await fetchMe()
    }

    const buildUserFromDTO = (dto: UserResponseDTO): User => {
        const { name, email, role, isBanned, emailIsVerified } = dto.user
        return { name, email, role, isBanned, emailIsVerified }
    }

    return {
        isAuthenticated,
        isAdmin,
        isUserBanned,
        isEmailVerified,
        user,
        initialize,
        register,
        login,
        logout,
        can,
    }
})
