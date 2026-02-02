<script setup lang="ts">
import BaseButton from "@/components/BaseButton.vue"
import HeaderWithTitleAndOptions from "@/components/HeaderWithTitleAndOptions.vue"
import { House, LogIn } from "lucide-vue-next"
import { RouterView } from "vue-router"

const title = "Trello like"
</script>

<template>
    <div class="h-screen flex flex-col divide-y">
        <header
            class="p-3 flex flex-row items-center gap-2 bg-gray-300 flex-none border-gray-400 w-full"
        >
            <HeaderWithTitleAndOptions>
                <div class="flex flex-row">
                    <h1 class="hidden">{{ title }}</h1>
                    <RouterLink
                        :to="{ name: 'home' }"
                        class="text-lg font-medium text-gray-900 bg-gray-300 hover:bg-gray-400 px-2 py-1 rounded-sm w-fit transition-colors"
                        >{{ title }}</RouterLink
                    >
                    <RouterLink
                        :to="{ name: 'home' }"
                        class="text-gray-600 bg-gray-300 hover:bg-gray-400 px-2 py-1 w-fit transition-colors rounded-full header-rounded-button flex justify-center items-center"
                        ><House :size="32" />
                    </RouterLink>

                    <RouterLink
                        :to="{ name: 'login' }"
                        class="text-gray-600 bg-gray-300 hover:bg-gray-400 px-2 py-1 w-fit transition-colors rounded-full header-rounded-button flex justify-center items-center"
                        ><LogIn :size="32" />
                    </RouterLink>
                </div>

                <template #options>
                    <div class="flex flex-row gap-2">
                        <BaseButton color="lightgray" to="login">Login</BaseButton>
                        <BaseButton color="lightgray" to="register">Register</BaseButton>
                    </div>
                </template>
            </HeaderWithTitleAndOptions>
        </header>
        <main>
            <RouterView />
        </main>
    </div>

    <main></main>
</template>

<style scoped>
.header-rounded-button {
    width: 38px;
    height: 38px;
}
</style>
