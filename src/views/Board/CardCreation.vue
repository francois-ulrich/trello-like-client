<script setup lang="ts">
import AddButtonSwitchToForm from "@/shared/components/AddButtonSwitchToForm.vue"
import ItemCreationForm from "@/shared/components/ItemCreationForm.vue"
import { useCardStore } from "@/features/cards/stores/card.store"
import type { Card } from "@/features/cards/domain/card.model"
import type { Column } from "@/features/columns/domain/column.model"

const props = defineProps<{ column: Column }>()
const cardStore = useCardStore()
const emit = defineEmits<{
    createCard: [value: Card]
}>()

const handleSubmit = (name: string) => {
    cardStore.create(props.column.boardId, props.column.id, {
        name,
    })
}
</script>

<template>
    <AddButtonSwitchToForm addButtonLabel="Add new card">
        <template #default="{ handleClose, addButtonLabel }">
            <ItemCreationForm
                @close="handleClose"
                @submit="handleSubmit"
                :addButtonLabel="addButtonLabel"
            />
        </template>
    </AddButtonSwitchToForm>
</template>
