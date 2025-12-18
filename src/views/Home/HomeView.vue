<script setup lang="ts">
import ModalDialog from "@/components/ModalDialog.vue"
import BoardItemBase from "@/components/BoardItemBase.vue"
import { useBoardStore } from "@/stores/board"
import type { Board } from "@/types/board"
import { nextTick, ref, useTemplateRef } from "vue"
import TextInput from "@/components/form/TextInput.vue"
import BaseButton from "@/components/BaseButton.vue"
import type { ComponentExposed } from "vue-component-type-helpers"

const boardStore = useBoardStore()

const boards = ref<Board[]>(boardStore.items)
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
    <div class="p-4">
        <div class="flex flex-col gap-4">
            <div>
                <h2 class="text-xl font-medium uppercase">Your boards</h2>
            </div>

            <ul class="flex flex-row gap-4">
                <li v-for="board in boards">
                    <BoardItemBase>
                        <RouterLink :to="{ name: 'board', params: { id: board.id } }">
                            <div class="flex flex-col-reverse h-full overflow-hidden">
                                <div class="bg-gray-200 p-2 flex-none text-center">
                                    <h3 class="text-gray-800 font-semibold text-sm">
                                        {{ board.name }}
                                    </h3>
                                </div>
                                <div
                                    class="bg-linear-to-b from-gray-300 to-gray-400 to-100% flex-auto"
                                ></div>
                            </div>
                        </RouterLink>
                    </BoardItemBase>
                </li>
                <li>
                    <BoardItemBase
                        class="bg-gray-200 flex justify-center items-center text-gray-600 font-semibold text-sm"
                    >
                        <button
                            class="cursor-pointer w-full h-full"
                            @click="handleBoardCreationModalOpen"
                        >
                            <p>Create new board</p>
                        </button>
                    </BoardItemBase>
                </li>
            </ul>

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
    </div>
</template>
