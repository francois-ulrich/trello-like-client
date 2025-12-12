<script setup lang="ts">
import { computed, ref, watchEffect } from "vue"
import { useColumnStore } from "@/stores/column"
import ColumnCreation from "@/views/Board/ColumnCreation.vue"
import ColumnItem from "@/views/Board/ColumnItem.vue"
import { useRoute } from "vue-router"
import { useBoardStore } from "@/stores/board"
import HeaderWithTitleAndOptions from "@/components/HeaderWithTitleAndOptions.vue"
import ActionsDropdown from "@/components/ActionsDropdown.vue"
import BaseButton from "@/components/BaseButton.vue"
import ModalDialog from "@/components/ModalDialog.vue"
import router from "@/router"
import { useGlobalStore } from "@/stores/global"

const route = useRoute()

const globalStore = useGlobalStore()
const boardStore = useBoardStore()
const columnStore = useColumnStore()

const board = computed(() => boardStore.get(route.params.id as string))

const columns = computed(() => {
    if (board.value === undefined) return []

    return columnStore.items.filter((column) => column.boardId === board.value?.id)
})

const boardDeleteModalRef = ref<InstanceType<typeof ModalDialog> | null>(null)

const handleBoardDeleteModalOpen = async () => {
    if (boardDeleteModalRef.value != null) boardDeleteModalRef.value.open()
}

const handleBoardDeletion = () => {
    if (board.value === undefined) return
    globalStore.removeBoard(board.value.id)
    router.push({ name: "home" })
}

watchEffect(() => {
    if (board.value === undefined) router.push({ name: "home" })
})
</script>

<template>
    <div class="flex flex-col" v-if="board !== undefined">
        <HeaderWithTitleAndOptions>
            <p class="text-lg font-medium">{{ board.name }}</p>
            <template #options>
                <ActionsDropdown :buttonIconSize="24">
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

        <div class="flex flex-col gap-y-4 flex-auto w-screen overflow-x-scroll">
            <div class="p-4">
                <ul class="flex flex-row gap-x-4">
                    <li v-for="column in columns">
                        <ColumnItem :column="column" />
                    </li>

                    <li><ColumnCreation :boardId="board.id" /></li>
                </ul>
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
