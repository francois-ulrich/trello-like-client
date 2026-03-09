<script setup lang="ts">
import BaseButton from "@/shared/components/BaseButton.vue"
import TextInput from "@/shared/components/form/TextInput.vue"
import { useAuthStore } from "@/features/auth/stores/authStore"
import { ref } from "vue"
import type { RegisterRequestDTO } from "@/features/auth/infrastructure/auth.request.dto"
import router from "@/router"

const formData = ref<RegisterRequestDTO>({
    name: "",
    email: "",
    password: "",
    passwordConfirmation: "",
})

const authStore = useAuthStore()

const handleSubmit = async () => {
    try {
        await authStore.register(formData.value)
        if (authStore.isAuthenticated) router.push({ name: "home" })
    } catch (e: unknown) {
        console.error(e)
    }
}
</script>

<template>
    <div class="p-4 flex flex-col gap-4">
        <p class="text-xl">Register</p>

        <div>
            <form @submit.prevent="handleSubmit" class="flex flex-col gap-2">
                <TextInput id="name" label="Username" v-model="formData.name" class="w-full mb-2" />

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
