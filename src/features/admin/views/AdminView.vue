<script setup lang="ts">
import type { UserDashboardEntry } from "@/features/admin/infrastructure/admin.response.dto"
import { useAdminStore } from "@/features/admin/stores/admin.store"
import { onMounted, ref } from "vue"

import DataTable from "primevue/datatable"
import Column from "primevue/column"
import BaseButton from "@/shared/components/BaseButton.vue"
import { formatDate } from "@/shared/utils/date"

const adminStore = useAdminStore()

const users = ref<UserDashboardEntry[]>()

onMounted(async () => {
    users.value = adminStore.users.map((user) => ({ ...user }))
})
</script>

<template>
    <div class="p-4 w-full space-y-4">
        <h1 class="text-2xl">Dashboard</h1>

        <h2 class="text-xl">Users</h2>

        <div class="w-full">
            <DataTable :value="users" paginator :rows="10">
                <Column field="id" header="Id" sortable></Column>
                <Column field="name" header="Name" sortable></Column>
                <Column field="email" header="Email" sortable></Column>
                <Column field="role" header="Role" sortable></Column>
                <Column field="createdAt" header="Created at" sortable>
                    <template #body="slotProps">
                        {{ formatDate(slotProps.data.createdAt) }}
                    </template>
                </Column>
                <Column field="bannedAt" header="Banned at" sortable>
                    <template #body="slotProps">
                        <p v-if="slotProps.data.bannedAt !== null">
                            {{ formatDate(slotProps.data.bannedAt) }}
                        </p>
                        <p v-else class="select-none">-</p>
                    </template>
                </Column>
                <Column field="actions" header="Actions">
                    <template #body="slotProps">
                        <div class="m-1">
                            <BaseButton
                                :to="{ name: 'admin/user', params: { id: slotProps.data.id } }"
                                >View</BaseButton
                            >
                        </div>
                    </template>
                </Column>
            </DataTable>
        </div>
    </div>
</template>
