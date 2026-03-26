<script setup lang="ts">
import { useAuthStore } from "@/features/auth/stores/authStore"
import { onMounted } from "vue"
import router from "@/router"

const authStore = useAuthStore()

onMounted(() => {
    if (authStore.isEmailVerified) {
        authStore.showVerifiedMessage = true
        router.push({ name: "home" })
    }
})
</script>

<template></template>
