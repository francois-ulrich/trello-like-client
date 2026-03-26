<script setup lang="ts">
import { useAuthStore } from "@/features/auth/stores/authStore"
import HomeUserBoards from "@/features/boards/components/HomeUserBoards.vue"
import BaseButton from "@/shared/components/BaseButton.vue"
import { computed, onMounted, ref } from "vue"
import router from "@/router"

const authStore = useAuthStore()

const verificationRequested = ref<boolean>(false)
const emailSent = ref<boolean>(false)
const errorOccurred = ref<boolean>(false)
const buttonIsDisabled = computed<boolean>(() => verificationRequested.value)

const handleSendVerificationEmail = async () => {
    verificationRequested.value = true
    errorOccurred.value = false

    try {
        await authStore.sendVerificationEmail()
        emailSent.value = true
    } catch (e: unknown) {
        verificationRequested.value = false
        errorOccurred.value = true
    }
}

onMounted(() => {
    if (authStore.isUserBanned) {
        router.push({ name: "banned" })
    }
})
</script>

<template>
    <div class="p-4 w-full">
        <div class="flex flex-col gap-4">
            <div
                v-if="authStore.showVerifiedMessage"
                class="p-4 bg-green-100 rounded border border-green-200 space-y-4"
            >
                <p>Your account has been verified !</p>
            </div>

            <div v-if="authStore.isAuthenticated">
                <p>Welcome, {{ authStore.user?.name }}</p>
            </div>

            <div
                v-if="authStore.isAuthenticated && !authStore.isEmailVerified"
                class="p-4 bg-blue-100 rounded border border-blue-200 space-y-4"
            >
                <p class="text-xl">Verify your e-mail address</p>

                <p>
                    We've sent an email to your specified address. Please check your inbox and
                    verify your email to activate your account.
                </p>

                <p>You can request a new verification email by clicking the button below :</p>

                <BaseButton
                    color="primary"
                    @click="handleSendVerificationEmail"
                    :disabled="buttonIsDisabled"
                    >Re-send verification email</BaseButton
                >

                <p v-if="emailSent">Verification email has been sent !</p>
                <p v-if="errorOccurred" class="text-red-900">
                    An error has occurred, please try again later.
                </p>
            </div>
            <HomeUserBoards v-else />
        </div>
    </div>
</template>
