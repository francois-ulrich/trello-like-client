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
import AdminActionUserBan from "@/features/admin/components/AdminActionUserBan.vue"
import AdminActionUserUnban from "@/features/admin/components/AdminActionUserUnban.vue"
import { computed } from "@vue/reactivity"

const route = useRoute()
const adminStore = useAdminStore()

const user = ref<UserDashboardEntry | undefined>(adminStore.getUserById(Number(route.params.id)))
const boards = ref<Board[]>()
const userBanned = computed<boolean>(
    () => user.value !== undefined && adminStore.isUserBanned(user.value.id),
)

onMounted(async () => {
    if (user.value == undefined) return

    await adminStore.loadUserBoards(user.value.id)
    boards.value = adminStore.userBoards
})
</script>

<template>
    <div v-if="user != undefined" class="p-4 w-full space-y-4">
        <div class="grid grid-cols-3">
            <div class="col-span-2 space-y-2">
                <h2 class="text-xl font-medium">User details</h2>
                <ul>
                    <li>Name : {{ user.name }}</li>
                    <li>Email : {{ user.email }}</li>
                    <li>Role : {{ user.role }}</li>
                    <li>Created at : {{ formatDate(user.createdAt) }}</li>
                </ul>
            </div>
            <div>
                <div class="bg-gray-200 rounded-sm p-2 space-y-4">
                    <h3 class="text-lg font-medium">Actions</h3>

                    <AdminActionUserBan :user="user" v-if="!userBanned" />
                    <AdminActionUserUnban :user="user" v-else />
                </div>
            </div>
        </div>

        <div v-if="user != undefined" class="space-y-4">
            <h3 class="text-lg font-medium">Boards</h3>

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
                        <div class="m-1">
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
                        </div>
                    </template>
                </Column>
            </DataTable>
        </div>
    </div>
</template>
