<script setup lang="ts">
import { type Component } from "vue"

defineProps<{
    icon: Component
}>()

const emit = defineEmits<{
    (e: "click"): void
}>()

const onClick = () => {
    emit("click")
}
</script>

<template>
    <button
        @click="onClick"
        class="p-2 cursor-pointer text-left flex flex-row transition-colors rounded-md bg-gray-200 hover:bg-gray-400"
    >
        <component :is="icon" class="mr-2" />
        <span>
            <slot></slot>
        </span>
    </button>
</template>
