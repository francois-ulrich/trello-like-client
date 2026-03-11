import { adminApi } from "@/features/admin/infrastructure/admin.api"
import type { UserDashboardEntry } from "@/features/admin/infrastructure/admin.response.dto"
import type { Board } from "@/features/boards/domain/board.model"
import { defineStore } from "pinia"
import { ref } from "vue"

export const useAdminStore = defineStore("admin", () => {
    const users = ref<UserDashboardEntry[]>([])
    const userBoards = ref<Board[]>([])

    function getUserById(id: number): UserDashboardEntry | undefined {
        return users.value.find((i) => i.id === id)
    }

    async function loadAllUsers() {
        const res = await adminApi.loadAllUsers()

        users.value = res.data.map((userDto) => ({
            id: userDto.id,
            name: userDto.name,
            email: userDto.email,
            role: userDto.role.name,
            createdAt: new Date(userDto.created_at),
        }))
    }

    async function loadUserBoards(id: number) {
        const res = await adminApi.loadUserBoards(id)
        userBoards.value = res.data
    }

    async function ensureUsersAreLoaded() {
        if (users.value.length === 0) {
            await loadAllUsers()
        }
    }

    return {
        users,
        userBoards,
        getUserById,
        loadAllUsers,
        loadUserBoards,
        ensureUsersAreLoaded,
    }
})
