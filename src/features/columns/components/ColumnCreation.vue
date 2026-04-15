<script setup lang="ts">
import { useStores } from "@/composables/useStores"
import AddButtonSwitchToForm from "@/shared/components/AddButtonSwitchToForm.vue"
import ItemCreationForm from "@/shared/components/ItemCreationForm.vue"

const props = defineProps<{ boardId: number }>()
const { columnStore } = useStores()

const handleSubmit = (name: string) => {
    columnStore.create(props.boardId, { name })
}
</script>

<template>
    <div class="w-80 shrink-0">
        <AddButtonSwitchToForm addButtonLabel="Add new column" buttonColor="lightgray">
            <template #default="{ handleClose, addButtonLabel }">
                <ItemCreationForm
                    @close="handleClose"
                    @submit="handleSubmit"
                    :addButtonLabel="addButtonLabel"
                />
            </template>
        </AddButtonSwitchToForm>
    </div>
</template>
