<script setup lang="ts">
import AddButtonSwitchToForm from "@/components/util/AddButtonSwitchToForm.vue"
import ItemCreationForm from "@/components/util/ItemCreationForm.vue"
import { useCardStore } from "@/stores/card"

const props = defineProps<{ columnId: string }>()
const cardStore = useCardStore()

const handleSubmit = (name: string) => {
    cardStore.create({ columnId: props.columnId, name })
}
</script>

<template>
    <AddButtonSwitchToForm addButtonLabel="Add new card">
        <template #default="{ handleClose, addButtonLabel }">
            <ItemCreationForm
                @close="handleClose"
                @submit="handleSubmit"
                :columnId="props.columnId"
                :addButtonLabel="addButtonLabel"
            />
        </template>
    </AddButtonSwitchToForm>
</template>
