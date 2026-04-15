<script setup lang="ts">
import { provideStores } from "@/composables/useProvideStores"
import BoardView from "@/features/boards/views/BoardView.vue"

provideStores("guest")
</script>

<template>
    <BoardView />
</template>
