<script setup lang="ts">
import BaseButton from "@/shared/components/BaseButton.vue"
import TextInput from "@/shared/components/form/TextInput.vue"
import { useAuthStore } from "@/features/auth/stores/authStore"
import { ref } from "vue"
import type { ForgotPasswordRequestDTO } from "@/features/auth/infrastructure/auth.request.dto"

const formData = ref<ForgotPasswordRequestDTO>({ email: "" })

const authStore = useAuthStore()

const handleSubmit = async () => {
    try {
        await authStore.sendPasswordChangeEmail(formData.value)
        // if (authStore.isAuthenticated) router.push({ name: "home" })
    } catch (e: unknown) {
        console.error(e)
    }
}
</script>

<template>
    <div class="p-4 flex flex-col gap-4">
        <p class="text-xl">Forgot your password</p>

        <p>Enter your email address and we'll send you a link yo reset your password.</p>

        <div>
            <form @submit.prevent="handleSubmit" class="flex flex-col gap-2">
                <TextInput
                    id="email"
                    label="Email ID"
                    v-model="formData.email"
                    class="w-full mb-2"
                />

                <BaseButton type="submit">Submit</BaseButton>
            </form>
        </div>
    </div>
</template>
