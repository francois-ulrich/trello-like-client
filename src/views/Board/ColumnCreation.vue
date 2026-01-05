<script setup lang="ts">
import AddButtonSwitchToForm from "@/components/AddButtonSwitchToForm.vue"
import ColumnContainer from "@/components/ColumnContainer.vue"
import ItemCreationForm from "@/components/ItemCreationForm.vue"
import { useColumnStore } from "@/stores/column"

const props = defineProps<{ boardId: string }>()
const columnStore = useColumnStore()

const handleSubmit = (name: string) => {
    columnStore.create({ boardId: props.boardId, name })
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
