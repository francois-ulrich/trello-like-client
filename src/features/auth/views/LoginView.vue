<script setup lang="ts">
import BaseButton from "@/components/BaseButton.vue"
import TextInput from "@/components/form/TextInput.vue"
import type { LoginFormData } from "@/features/auth/models"
import { useAuthStore } from "@/features/auth/stores/authStore"
import { ref } from "vue"
import router from "@/router"

const formData = ref<LoginFormData>({ email: "", password: "" })

const authStore = useAuthStore()

const tryLogin = async () => {
    try {
        await authStore.login(formData.value)

        if (authStore.isAuthenticated) router.push({ name: "home" })
    } catch {}
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
