import { adminApi } from "@/features/admin/infrastructure/admin.api"
import type { UserDashboardEntry } from "@/features/admin/infrastructure/admin.response.dto"
import { defineStore } from "pinia"
import { ref } from "vue"

export const useAdminStore = defineStore("admin", () => {
    const users = ref<UserDashboardEntry[]>([])

    async function getAllUsers() {
        const res = await adminApi.getAllUsers()

        users.value = res.data.map((userDto) => ({
            id: userDto.id,
            name: userDto.name,
            email: userDto.email,
            role: userDto.role.name,
            createdAt: new Date(userDto.created_at),
        }))
    }

    return {
        users,
        getAllUsers,
    }
})
