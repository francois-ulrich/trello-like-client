<script setup lang="ts">
import { useAuthStore } from "@/features/auth/stores/authStore"
import HomeUserBoards from "@/features/boards/components/HomeUserBoards.vue"

const authStore = useAuthStore()
</script>

<template>
    <div class="p-4 w-full">
        <div class="flex flex-col gap-4">
            <div v-if="authStore.isAuthenticated">
                <p>Welcome, {{ authStore.user?.name }}</p>
            </div>

            <div
                v-if="authStore.isAuthenticated && !authStore.isEmailVerified"
                class="p-4 bg-blue-100 rounded border border-blue-200"
            >
                <p class="text-blue-800">
                    Your email address is not verified yet. Please check your inbox and verify your
                    email to continue.
                </p>
            </div>
            <HomeUserBoards v-else />
        </div>
    </div>
</template>
