<script setup lang="ts">
import { useAuthStore } from "@/features/auth/stores/authStore"
import HomeUserBoards from "@/features/boards/components/HomeUserBoards.vue"
import BaseButton from "@/shared/components/BaseButton.vue"
import { ref } from "vue"

const authStore = useAuthStore()

const verificationRequested = ref<boolean>(false)
const emailSent = ref<boolean>(false)

const handleSendVerificationEmail = async () => {
    verificationRequested.value = true
    console.log("handleSendVerificationEmail")
    // const res = await authStore.sendVerificationEmail()
    // emailSent.value = true
}
</script>

<template>
    <div class="p-4 w-full">
        <div class="flex flex-col gap-4">
            <div v-if="authStore.isAuthenticated">
                <p>Welcome, {{ authStore.user?.name }}</p>
            </div>

            <div
                v-if="authStore.isAuthenticated && !authStore.isEmailVerified"
                class="p-4 bg-blue-100 rounded border border-blue-200 space-y-4"
            >
                <p class="text-blue-800">
                    Your email address is not verified yet. Please check your inbox and verify your
                    email to continue.
                </p>

                <BaseButton
                    color="primary"
                    @click="handleSendVerificationEmail"
                    :disabled="verificationRequested && !emailSent"
                    >Re-send verification email</BaseButton
                >

                {{ verificationRequested && !emailSent }}
            </div>
            <HomeUserBoards v-else />
        </div>
    </div>
</template>
