<script setup lang="ts">
import ModalDialog from "@/components/ModalDialog.vue"
import BoardItemBase from "@/components/BoardItemBase.vue"
import { useBoardStore } from "@/features/boards/stores/board.store"
import type { Board } from "@/features/boards/domain/board.model"
import { computed, nextTick, ref, useTemplateRef } from "vue"
import TextInput from "@/components/form/TextInput.vue"
import BaseButton from "@/components/BaseButton.vue"
import type { ComponentExposed } from "vue-component-type-helpers"
import { useAuthStore } from "@/features/auth/stores/authStore"

const authStore = useAuthStore()
const boardStore = useBoardStore()

const textInputRef = useTemplateRef<ComponentExposed<typeof TextInput>>("textInputRef")
const boardDeleteModalRef = ref<InstanceType<typeof ModalDialog> | null>(null)

const boardCreationForm = ref<{ name: string }>({
    name: "",
})

const boards = computed<Board[]>(() => boardStore.items)

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
    <div class="p-4 w-full">
        <div class="flex flex-col gap-4">
            <div v-if="authStore.isAuthenticated">
                <p>Welcome, {{ authStore.user?.name }}</p>
            </div>

            <div>
                <h2 class="text-xl font-medium uppercase">Your boards</h2>
            </div>

            <ul class="flex flex-row gap-4 flex-auto overflow-x-auto pb-4 w-full">
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
