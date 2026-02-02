<script setup lang="ts">
import BaseButton from "@/components/BaseButton.vue"
import TextInput from "@/components/form/TextInput.vue"
import type { RegisterFormData } from "@/features/auth/models"
import { useAuthStore } from "@/features/auth/stores/authStore"
import { ref } from "vue"

const formData = ref<RegisterFormData>({
    name: "",
    email: "",
    password: "",
    passwordConfirmation: "",
})

const authStore = useAuthStore()

const handleSubmit = () => {
    authStore.register(formData.value)
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
