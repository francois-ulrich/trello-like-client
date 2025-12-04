<script setup lang="ts">
import AddButtonSwitchToForm from "@/components/util/AddButtonSwitchToForm.vue"
import ColumnContainer from "@/components/util/ColumnContainer.vue"
import ItemCreationForm from "@/components/util/ItemCreationForm.vue"
import { useColumnStore } from "@/stores/column"

const props = defineProps<{ boardId: string }>()
const columnStore = useColumnStore()

const handleSubmit = (name: string) => {
    columnStore.create({ boardId: props.boardId, name })
}
</script>

<template>
    <ColumnContainer>
        <AddButtonSwitchToForm addButtonLabel="Add new column">
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
