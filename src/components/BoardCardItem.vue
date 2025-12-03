<script setup lang="ts">
import ModalDialog from "@/components/ModalDialog.vue"
import RoundedCard from "@/components/util/RoundedCard.vue"
import type { Card } from "@/types/card"
import type { Column } from "@/types/column"
import { SquarePen } from "lucide-vue-next"
import { ref } from "vue"

const props = defineProps<{ card: Card; column: Column }>()

const showModal = ref<boolean>(false)

const handleModalOpen = () => {
    showModal.value = true
}

const handleModalClose = () => {
    showModal.value = false
}
</script>

<template>
    <RoundedCard
        class="bg-gray-300 p-4 cursor-pointer box-border relative group"
        @click="handleModalOpen"
    >
        <p class="font-medium">{{ props.card.name }}</p>
        <SquarePen class="absolute top-2 right-2 opacity-0 group-hover:opacity-100" :size="16" />

        <Teleport to="body" v-if="showModal">
            <ModalDialog @close="handleModalClose">
                <template #header>
                    <p class="font-medium">{{ props.column.name }}</p>
                </template>

                <h2 class="text-2xl font-medium">{{ props.card.name }}</h2>
            </ModalDialog>
        </Teleport>
    </RoundedCard>
</template>

<style scoped></style>
