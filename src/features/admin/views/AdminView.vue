<script setup lang="ts">
import type { UserDashboardEntry } from "@/features/admin/infrastructure/admin.response.dto"
import { useAdminStore } from "@/features/admin/stores/admin.store"
import { onMounted, ref } from "vue"

import VueTableLite from "vue3-table-lite/ts"

const adminStore = useAdminStore()

const users = ref<UserDashboardEntry[]>([])
const paginatedUsers = ref<UserDashboardEntry[]>([])

const columns = [
    {
        label: "Id",
        field: "id",
        sortable: true,
    },
    {
        label: "Name",
        field: "name",
        sortable: true,
    },
    {
        label: "Email",
        field: "email",
        sortable: true,
    },
    {
        label: "Role",
        field: "role",
        sortable: true,
    },
    {
        label: "Created",
        field: "createdAt",
        sortable: true,
        display: (row: UserDashboardEntry) =>
            new Intl.DateTimeFormat("en-US", {
                dateStyle: "medium",
                timeStyle: "short",
            }).format(row.createdAt),
    },
]

const doSearch = (
    offset: number,
    limit: number,
    field: keyof UserDashboardEntry,
    direction: "asc" | "desc",
) => {
    const modifier = direction === "asc" ? 1 : -1

    users.value.sort((userA, userB) => {
        const valA = userA[field]
        const valB = userB[field]

        if (typeof valA === "string" && typeof valB === "string") {
            return valA.localeCompare(valB) * modifier
        }

        if (valA < valB) return -1 * modifier
        if (valA > valB) return 1 * modifier
        return 0
    })

    paginatedUsers.value = users.value.slice(offset, offset + limit)
}

onMounted(async () => {
    await adminStore.getAllUsers()
    users.value = adminStore.users
    doSearch(0, 10, "id", "asc")
})
</script>

<template>
    <div class="p-4 w-full space-y-4">
        <h1 class="text-2xl">Dashboard</h1>

        <h2 class="text-xl">Users</h2>

        <div class="w-full">
            <VueTableLite
                :columns="columns"
                :rows="paginatedUsers"
                :total="adminStore.users.length"
                @do-search="doSearch"
                class="w-full"
            ></VueTableLite>
        </div>
    </div>
</template>
