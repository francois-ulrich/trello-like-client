<script setup lang="ts">
import ModalDialog from "@/components/ModalDialog.vue"
import TextInput from "@/components/form/TextInput.vue"
import BaseButton from "@/components/BaseButton.vue"
import type { ComponentExposed } from "vue-component-type-helpers"
import { nextTick, ref, useTemplateRef } from "vue"
import { useBoardStore } from "@/features/boards/stores/board.store"
import BoardItemBase from "@/components/BoardItemBase.vue"

const boardStore = useBoardStore()

const textInputRef = useTemplateRef<ComponentExposed<typeof TextInput>>("textInputRef")
const boardDeleteModalRef = ref<InstanceType<typeof ModalDialog> | null>(null)

const boardCreationForm = ref<{ name: string }>({
    name: "",
})

const handleBoardCreationModalOpen = async () => {
    if (boardDeleteModalRef?.value === null) return

    boardDeleteModalRef?.value?.open()
    await nextTick()
    textInputRef.value?.inputRef?.focus()
}

const handleBoardCreationFormSubmit = () => {
    if (boardCreationForm.value.name.length === 0) return
    const newBoard = { name: boardCreationForm.value.name }
    boardStore.create(newBoard)
    boardCreationForm.value.name = ""
    if (boardDeleteModalRef?.value !== null) boardDeleteModalRef.value.close()
}
</script>

<template>
    <div>
        <BoardItemBase
            class="bg-gray-200 flex justify-center items-center text-gray-600 font-semibold text-sm"
        >
            <button class="cursor-pointer w-full h-full" @click="handleBoardCreationModalOpen">
                <p>Create new board</p>
            </button>
        </BoardItemBase>

        <ModalDialog ref="boardDeleteModalRef" :withBackdrop="true">
            <template #header>
                <p class="font-medium">Create new board</p>
            </template>

            <form @submit.prevent="handleBoardCreationFormSubmit" class="flex flex-col gap-2">
                <TextInput
                    id="name"
                    label="Name"
                    v-model="boardCreationForm.name"
                    class="w-full mb-2"
                    ref="textInputRef"
                />

                <div>
                    <BaseButton type="submit">Create board</BaseButton>
                </div>
            </form>
        </ModalDialog>
    </div>
</template>
