<script setup lang="ts">
import BaseButton from "@/components/util/BaseButton.vue"
import RoundedCard from "@/components/util/RoundedCard.vue"
import { X } from "lucide-vue-next"

const emit = defineEmits<{
    (e: "close"): void
}>()

const handleClose = () => {
    emit("close")
}
</script>

<template>
    <div
        @click="handleClose"
        class="fixed top-0 left-0 w-full h-full bg-black opacity-50 cursor-pointer z-10"
    ></div>
    <RoundedCard
        class="fixed w-xl top-1/2 left-1/2 z-20 bg-gray-50 modal-dialog__body p-0! divide-gray-400"
    >
        <div class="relative">
            <header class="p-4">
                <BaseButton
                    @click="handleClose"
                    color="white"
                    class="absolute top-3 right-3 group-hover:opacity-100 cursor-pointer color rounded-full!"
                >
                    <X :size="18" />
                </BaseButton>
                <slot name="header"></slot>
            </header>
            <main class="p-6">
                <slot></slot>
            </main>
        </div>
    </RoundedCard>
</template>

<style scoped>
.modal-dialog__body {
    transform: translate(-50%, -50%);
}
</style>
