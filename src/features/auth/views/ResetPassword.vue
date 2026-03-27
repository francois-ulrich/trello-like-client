<script setup lang="ts">
import BaseButton from "@/shared/components/BaseButton.vue"
import TextInput from "@/shared/components/form/TextInput.vue"
import { useAuthStore } from "@/features/auth/stores/authStore"
import { ref } from "vue"
import type { ResetPasswordRequestDTO } from "@/features/auth/infrastructure/auth.request.dto"
import router from "@/router"
import { useRoute } from "vue-router"

const route = useRoute()

const formData = ref<ResetPasswordRequestDTO>({
    email: (route.query.email as string) || "",
    token: (route.query.token as string) || "",
    password: "",
    passwordConfirmation: "",
})

const authStore = useAuthStore()

const handleSubmit = async () => {
    try {
        await authStore.resetPassword(formData.value)
        if (authStore.isAuthenticated) router.push({ name: "home" })
    } catch (e: unknown) {
        console.error(e)
    }
}
</script>

<template>
    <div class="p-4 flex flex-col gap-4">
        <p class="text-xl">Reset password</p>

        <div>
            <form @submit.prevent="handleSubmit" class="flex flex-col gap-2">
                <TextInput
                    id="password"
                    label="Password"
                    v-model="formData.password"
                    class="w-full mb-2"
                    type="password"
                />

                <TextInput
                    id="passwordConfirmation"
                    label="Confirm password"
                    v-model="formData.passwordConfirmation"
                    class="w-full mb-2"
                    type="password"
                />

                <BaseButton type="submit">Submit</BaseButton>
            </form>
        </div>
    </div>
</template>
