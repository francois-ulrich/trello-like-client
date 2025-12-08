<script setup lang="ts">
import ModalDialog from "@/views/Board/ModalDialog.vue"
import BoardItemBase from "@/components/BoardItemBase.vue"
import { useBoardStore } from "@/stores/board"
import type { Board } from "@/types/board"
import BoardItem from "@/views/Home/BoardItem.vue"
import { ref } from "vue"

const boardStore = useBoardStore()

const boards = ref<Board[]>(boardStore.items)

const showBoardCreationModal = ref<boolean>(false)

const handleModalOpen = () => {
    showBoardCreationModal.value = true
}

const handleModalClose = () => {
    showBoardCreationModal.value = false
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
                    @click="handleModalOpen"
                >
                    <p>Create new board</p>
                </BoardItemBase>
            </li>
        </ul>

        <Teleport to="body" v-if="showBoardCreationModal">
            <ModalDialog @close="handleModalClose">
                <template #header>
                    <p class="font-medium">Create new board</p>
                </template>
            </ModalDialog>
        </Teleport>
    </div>
</template>
