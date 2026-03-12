<script setup lang="ts">
import type { UserDashboardEntry } from "@/features/admin/infrastructure/admin.response.dto"
import { useAdminStore } from "@/features/admin/stores/admin.store"
import type { Board } from "@/features/boards/domain/board.model"
import { formatDate } from "@/shared/utils/date"
import { onMounted, ref } from "vue"
import { useRoute } from "vue-router"
import DataTable from "primevue/datatable"
import Column from "primevue/column"
import BaseButton from "@/shared/components/BaseButton.vue"

const route = useRoute()
const adminStore = useAdminStore()

const user = ref<UserDashboardEntry | undefined>(adminStore.getUserById(Number(route.params.id)))
const boards = ref<Board[]>()

onMounted(async () => {
    if (user.value == undefined) return

    await adminStore.loadUserBoards(user.value.id)
    boards.value = adminStore.userBoards
})
</script>

<template>
    <div class="p-4 w-full">
        <div v-if="user != undefined" class="space-y-4">
            <ul>
                <li>Name : {{ user.name }}</li>
                <li>Email : {{ user.email }}</li>
                <li>Role : {{ user.role }}</li>
                <li>Created at : {{ formatDate(user.createdAt) }}</li>
            </ul>

            <h2 class="text-xl">Boards</h2>

            <DataTable :value="boards" paginator :rows="10">
                <Column field="id" header="Id" sortable></Column>
                <Column field="name" header="Name" sortable></Column>
                <Column field="createdAt" header="Created at" sortable>
                    <template #body="slotProps">
                        {{ formatDate(slotProps.data.createdAt) }}
                    </template>
                </Column>
                <Column field="actions" header="Actions">
                    <template #body="slotProps">
                        <BaseButton
                            :to="{
                                name: 'admin/user/board',
                                params: {
                                    userId: user.id,
                                    boardId: slotProps.data.id,
                                },
                            }"
                            >View</BaseButton
                        >
                    </template>
                </Column>
            </DataTable>
        </div>
    </div>
</template>
