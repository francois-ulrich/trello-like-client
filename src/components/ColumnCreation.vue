<script setup lang="ts">
import ColumnAddForm from "@/components/ColumnAddForm.vue"
import AddButtonSwitchToForm from "@/components/util/AddButtonSwitchToForm.vue"
import ColumnContainer from "@/components/util/ColumnContainer.vue"

const props = defineProps<{ boardId: string }>()
</script>

<template>
    <ColumnContainer>
        <AddButtonSwitchToForm addButtonLabel="Add new column">
            <template #default="{ handleClose, addButtonLabel }">
                <ColumnAddForm
                    :boardId="props.boardId"
                    @close="handleClose"
                    :addButtonLabel="addButtonLabel"
                />
            </template>
        </AddButtonSwitchToForm>
    </ColumnContainer>
</template>
