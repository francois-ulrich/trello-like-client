<script setup lang="ts">
import ModalDialog from "@/views/Board/ModalDialog.vue"
import BoardItemBase from "@/components/BoardItemBase.vue"
import { useBoardStore } from "@/stores/board"
import type { Board } from "@/types/board"
import BoardItem from "@/views/Home/BoardItem.vue"
import { ref } from "vue"
import TextInput from "@/components/form/TextInput.vue"
import BaseButton from "@/components/BaseButton.vue"

const boardStore = useBoardStore()

const boards = ref<Board[]>(boardStore.items)

const cardEditForm = ref<{ name: string }>({
    name: "",
})

const showBoardCreationModal = ref<boolean>(false)

const handleBoardCreationModalOpen = () => {
    showBoardCreationModal.value = true
}

const handleBoardCreationModalClose = () => {
    showBoardCreationModal.value = false
}

const handleBoardCreationFormSubmit = () => {
    if (cardEditForm.value.name.length === 0) return
    const newBoard = { name: cardEditForm.value.name }
    boardStore.create(newBoard)
    cardEditForm.value.name = ""
    handleBoardCreationModalClose()
}
</script>

<template>
    <div>
        <h2 class="text-xl font-medium uppercase">Your boards</h2>

        <ul class="flex flex-row gap-4">
            <li v-for="board in boards">
                <RouterLink :to="{ name: 'board', params: { id: board.id } }">
                    <BoardItem :board="board" />
                </RouterLink>
            </li>
            <li>
                <BoardItemBase
                    class="bg-gray-200 flex justify-center items-center text-gray-600 font-semibold text-sm"
                    @click="handleBoardCreationModalOpen"
                >
                    <p>Create new board</p>
                </BoardItemBase>
            </li>
        </ul>

        <Teleport to="body" v-if="showBoardCreationModal">
            <ModalDialog @close="handleBoardCreationModalClose">
                <template #header>
                    <p class="font-medium">Create new board</p>
                </template>

                <form @submit.prevent="handleBoardCreationFormSubmit" class="flex flex-col gap-2">
                    <TextInput
                        id="name"
                        label="Name"
                        v-model="cardEditForm.name"
                        class="w-full mb-2"
                    />

                    <div>
                        <BaseButton type="submit">Create board</BaseButton>
                    </div>
                </form>
            </ModalDialog>
        </Teleport>
    </div>
</template>
