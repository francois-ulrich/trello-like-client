<script setup lang="ts">
import AddButtonSwitchToForm from "@/components/util/AddButtonSwitchToForm.vue"
import ItemCreationForm from "@/components/util/ItemCreationForm.vue"
import { useCardStore } from "@/stores/card"
import type { Card } from "@/types/card"

const props = defineProps<{ columnId: string }>()
const cardStore = useCardStore()
const emit = defineEmits<{
    createCard: [value: Card]
}>()

const handleSubmit = (name: string) => {
    const newCard = cardStore.create({ columnId: props.columnId, name })
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
