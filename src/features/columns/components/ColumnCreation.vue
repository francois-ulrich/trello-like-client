<script setup lang="ts">
import AddButtonSwitchToForm from "@/shared/components/AddButtonSwitchToForm.vue"
import ColumnContainer from "@/shared/components/ColumnContainer.vue"
import ItemCreationForm from "@/shared/components/ItemCreationForm.vue"
import { useColumnStore } from "@/features/columns/stores/column.store"

const props = defineProps<{ boardId: number }>()
const columnStore = useColumnStore()

const handleSubmit = (name: string) => {
    columnStore.create(props.boardId, { name })
}
</script>

<template>
    <ColumnContainer>
        <AddButtonSwitchToForm addButtonLabel="Add new column" buttonColor="lightgray">
            <template #default="{ handleClose, addButtonLabel }">
                <ItemCreationForm
                    @close="handleClose"
                    @submit="handleSubmit"
                    :addButtonLabel="addButtonLabel"
                />
            </template>
        </AddButtonSwitchToForm>
    </ColumnContainer>
</template>
