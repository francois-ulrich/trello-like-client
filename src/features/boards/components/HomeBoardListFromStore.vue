<script setup lang="ts">
import { provideStores } from "@/composables/useProvideStores"
import HomeBoardsList from "@/features/boards/components/HomeBoardsList.vue"
import type { StoreMode } from "@/shared/types/stores"

const props = defineProps<{ mode: StoreMode }>()

provideStores(props.mode)
</script>

<template>
    <HomeBoardsList />
</template>
