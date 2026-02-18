<script setup lang="ts">
import AddButtonSwitchToForm from "@/components/AddButtonSwitchToForm.vue"
import ItemCreationForm from "@/components/ItemCreationForm.vue"
import { useCardStore } from "@/features/cards/stores/card"
import type { Card } from "@/features/cards/domain/card.model"
import type { Column } from "@/features/columns/domain/column.model"

const props = defineProps<{ column: Column }>()
const cardStore = useCardStore()
const emit = defineEmits<{
    createCard: [value: Card]
}>()

const handleSubmit = (name: string) => {
    const newCard = cardStore.create({
        columnId: props.column.id,
        name,
        position: cardStore.items.filter((card) => card.columnId === props.column.id).length,
    })
    emit("createCard", newCard)
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
