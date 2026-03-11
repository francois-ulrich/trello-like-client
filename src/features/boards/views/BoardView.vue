<script setup lang="ts">
import { computed, ref, watch, watchEffect } from "vue"
import { useRoute } from "vue-router"
import { useBoardStore } from "@/features/boards/stores/board.store"
import HeaderWithTitleAndOptions from "@/shared/components/HeaderWithTitleAndOptions.vue"
import ActionsDropdown from "@/shared/components/ActionsDropdown.vue"
import BaseButton from "@/shared/components/BaseButton.vue"
import ModalDialog from "@/shared/components/ModalDialog.vue"
import router from "@/router"
import Renamable from "@/shared/components/Renamable.vue"
import ColumnCreation from "@/features/columns/components/ColumnCreation.vue"
import ColumnItem from "@/features/columns/components/ColumnItem.vue"
import { useAuthStore } from "@/features/auth/stores/authStore"
import type { Column } from "@/features/columns/domain/column.model"
import draggable from "vuedraggable"
import type {
    DraggableChangeEvent,
    DraggableChangeEventPayloadMoved,
} from "@/shared/types/draggable"
import { useColumnStore } from "@/features/columns/stores/column.store"
import type { Board } from "@/features/boards/domain/board.model"

const route = useRoute()

const authStore = useAuthStore()
const boardStore = useBoardStore()
const columnStore = useColumnStore()

const boardDeleteModalRef = ref<InstanceType<typeof ModalDialog> | null>(null)
const renamableRef = ref<InstanceType<typeof Renamable> | null>(null)

const board = computed<Board | undefined>(() => boardStore.getById(Number(route.params.id)))
const columns = ref<Column[]>()

watch(
    () => (board.value !== undefined ? boardStore.getColumnsInBoard(board.value.id) : []),
    (newColumns) => {
        columns.value = [...newColumns]
    },
    { immediate: true },
)

const moveColumn = async (move: DraggableChangeEventPayloadMoved<Column>) => {
    console.log("moveColumn")
    await columnStore.move(move.element.id, {
        targetPosition: move.newIndex,
    })
}

const handleColumnsMove = (e: DraggableChangeEvent<Column>) => {
    if (e.moved) {
        moveColumn(e.moved)
        return
    }
}

const handleBoardDeleteModalOpen = async () => {
    boardDeleteModalRef.value?.open()
}

const handleBoardDeletion = () => {
    if (board.value === undefined) return
    boardStore.remove(board.value.id)
    router.push({ name: "home" })
}

watchEffect(() => {
    if (authStore.isAuthenticated && board.value === null) router.push({ name: "home" }) // move to route guard async
})

const handleBoardNameUpdate = async (value: string) => {
    if (board.value === undefined) return

    try {
        await boardStore.update(board.value.id, { name: value })
        board.value.name = value
    } catch (e: unknown) {
        console.error(e)
    }
}

const handleBoardRename = async () => {
    boardDeleteModalRef.value?.close()
    renamableRef.value?.open()
}
</script>

<template>
    <div class="flex flex-col" v-if="board !== undefined">
        <HeaderWithTitleAndOptions class="p-4 bg-gray-200">
            <h2 class="hidden">{{ board.name }}</h2>

            <Renamable
                ref="renamableRef"
                textClass="text-lg font-medium"
                :text="board.name"
                @textUpdate="handleBoardNameUpdate"
            ></Renamable>

            <template #options>
                <ActionsDropdown :buttonIconSize="24" alignModal="right">
                    <template #header>
                        <p class="font-medium text-center">Board actions</p>
                    </template>

                    <BaseButton
                        color="white"
                        shape="rectangle"
                        class="w-full"
                        @click="handleBoardRename"
                        >Rename</BaseButton
                    >

                    <BaseButton
                        color="white"
                        shape="rectangle"
                        class="w-full"
                        v-if="boardDeleteModalRef != null"
                        @click="handleBoardDeleteModalOpen"
                        >Delete</BaseButton
                    >
                </ActionsDropdown>
            </template>
        </HeaderWithTitleAndOptions>

        <div class="overflow-x-scroll w-screen">
            <div class="flex flex-row gap-x-4 flex-auto p-4 max-w-none w-full">
                <draggable
                    v-model="columns"
                    item-key="id"
                    group="columns"
                    class="flex flex-row gap-x-4"
                    @change="handleColumnsMove"
                >
                    <template #item="{ element }: { element: Column }">
                        <ColumnItem :column="element" />
                    </template>
                </draggable>

                <ColumnCreation :boardId="board.id" />
            </div>
        </div>

        <ModalDialog ref="boardDeleteModalRef" :withBackdrop="true">
            <template #header><p class="text-center font-medium">Delete board ?</p> </template>

            <div class="flex flex-col gap-4">
                <p>
                    Are you sure you want to delete this board&nbsp;? This action is irreversible.
                </p>

                <BaseButton color="danger" @click="handleBoardDeletion">
                    <p class="text-center">Delete board</p>
                </BaseButton>
            </div>
        </ModalDialog>
    </div>
</template>

<style scoped></style>
