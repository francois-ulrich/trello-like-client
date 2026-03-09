<script setup lang="ts">
import BaseButton from "@/shared/components/BaseButton.vue"
import TextInput from "@/shared/components/form/TextInput.vue"
import { useAuthStore } from "@/features/auth/stores/authStore"
import { ref } from "vue"
import router from "@/router"
import type { LoginRequestDTO } from "@/features/auth/infrastructure/auth.request.dto"

const formData = ref<LoginRequestDTO>({ email: "", password: "" })

const authStore = useAuthStore()

const tryLogin = async () => {
    try {
        await authStore.login(formData.value)
        if (authStore.isAuthenticated) router.push({ name: "home" })
    } catch (e: unknown) {
        console.error(e)
    }
}

const handleSubmit = () => {
    tryLogin()
}
</script>

<template>
    <div class="p-4 flex flex-col gap-4">
        <p class="text-xl">Sign in</p>

        <div>
            <form @submit.prevent="handleSubmit" class="flex flex-col gap-2">
                <TextInput
                    id="email"
                    label="Email ID"
                    v-model="formData.email"
                    class="w-full mb-2"
                />
                <TextInput
                    id="password"
                    label="Password"
                    v-model="formData.password"
                    class="w-full mb-2"
                    type="password"
                />

                <BaseButton type="submit">Submit</BaseButton>
            </form>
        </div>
    </div>
</template>
