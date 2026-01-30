<script setup lang="ts">
import BaseButton from "@/components/BaseButton.vue"
import TextInput from "@/components/form/TextInput.vue"
import { useAuthStore } from "@/features/auth/stores/authStore"
import { ref } from "vue"

interface FormData {
    email: string
    password: string
}

const formData = ref<FormData>({ email: "", password: "" })

const authStore = useAuthStore()

const handleSubmit = () => {
    authStore.logIn(formData.value)
}
</script>

<template>
    <p>Sign in</p>

    <div>
        <form @submit.prevent="handleSubmit" class="flex flex-col gap-2">
            <TextInput id="email" label="Email ID" v-model="formData.email" class="w-full mb-2" />
            <TextInput
                id="password"
                label="Password"
                v-model="formData.password"
                class="w-full mb-2"
                type="password"
            />

            <BaseButton @click="handleSubmit">Submit</BaseButton>
        </form>
    </div>
</template>
