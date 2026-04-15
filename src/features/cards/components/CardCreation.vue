<script setup lang="ts">
import AddButtonSwitchToForm from "@/shared/components/AddButtonSwitchToForm.vue"
import ItemCreationForm from "@/shared/components/ItemCreationForm.vue"
import type { Card } from "@/features/cards/domain/card.model"
import type { Column } from "@/features/columns/domain/column.model"
import { useStores } from "@/composables/useStores"

const props = defineProps<{ column: Column }>()
const { cardStore } = useStores()
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
