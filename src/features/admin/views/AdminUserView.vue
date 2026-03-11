<script setup lang="ts">
import type { UserDashboardEntry } from "@/features/admin/infrastructure/admin.response.dto"
import { useAdminStore } from "@/features/admin/stores/admin.store"
import { formatDate } from "@/shared/utils/date"
import { onMounted, ref } from "vue"
import { useRoute } from "vue-router"

const route = useRoute()
const adminStore = useAdminStore()

const user = ref<UserDashboardEntry | undefined>(adminStore.getUserById(Number(route.params.id)))

onMounted(() => {
    if (user.value != undefined) adminStore.getUserBoards(user.value.id)
})
</script>

<template>
    <div v-if="user != undefined">
        <p>{{ user }}</p>

        <ul>
            <li>Name : {{ user.name }}</li>
            <li>Email : {{ user.email }}</li>
            <li>Role : {{ user.role }}</li>
            <li>Created at : {{ formatDate(user.createdAt) }}</li>
        </ul>
    </div>
</template>
