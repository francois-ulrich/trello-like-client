<script setup lang="ts">
import type { UserDashboardEntry } from "@/features/admin/infrastructure/admin.response.dto"
import { useAdminStore } from "@/features/admin/stores/admin.store"
import { computed, onMounted, ref } from "vue"

import VueTableLite from "vue3-table-lite/ts"

const adminStore = useAdminStore()

const page = ref<number>(1)
const perPage = ref<number>(10)

const paginatedUsers = computed(() =>
    adminStore.users.slice((page.value - 1) * perPage.value, page.value * perPage.value),
)

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
    },
    {
        label: "Role",
        field: "role",
    },
    {
        label: "Created",
        field: "createdAt",
        display: (row: UserDashboardEntry) =>
            new Intl.DateTimeFormat("fr-FR", {
                dateStyle: "medium",
                timeStyle: "short",
            }).format(row.createdAt),
    },
]

const sortable = ref<{ order: string; sort: string }>({ order: "id", sort: "asc" })

// const doSearch = (offset: number, limit: number, order: string, sort: string) => {
//     table.isLoading = true
//     setTimeout(() => {
//         table.isReSearch = offset == undefined ? true : false
//         if (offset >= 10 || limit >= 20) {
//             limit = 20
//         }
//         if (sort == "asc") {
//             table.rows = sampleData1(offset, limit)
//         } else {
//             table.rows = sampleData2(offset, limit)
//         }
//         table.totalRecordCount = 20
//         table.sortable.order = order
//         table.sortable.sort = sort
//     }, 600)
// }

onMounted(() => {
    adminStore.getAllUsers()
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
                :sortable="sortable"
                class="w-full"
            ></VueTableLite>
        </div>
    </div>
</template>
