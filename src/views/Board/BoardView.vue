<script setup lang="ts">
import { computed } from "vue"
import { useColumnStore } from "@/stores/column"
import ColumnCreation from "@/views/Board/ColumnCreation.vue"
import ColumnItem from "@/views/Board/ColumnItem.vue"
import { useRoute } from "vue-router"
import { useBoardStore } from "@/stores/board"
import HeaderWithTitleAndOptions from "@/components/HeaderWithTitleAndOptions.vue"
import ActionsDropdown from "@/components/ActionsDropdown.vue"
import BaseButton from "@/components/BaseButton.vue"

const route = useRoute()

const board = computed(() => useBoardStore().get(route.params.id as string))

const columns = computed(() => {
    if (board.value === undefined) return []

    return columnStore.items.filter((column) => column.boardId === board.value?.id)
})
const columnStore = useColumnStore()
</script>

<template>
    <div class="flex flex-col" v-if="board !== undefined">
        <HeaderWithTitleAndOptions>
            <p class="text-lg font-medium">{{ board.name }}</p>
            <template #options>
                <ActionsDropdown :buttonIconSize="24" teleportTo="">
                    <BaseButton color="white" shape="rectangle" class="w-full">Rename</BaseButton>
                    <BaseButton color="white" shape="rectangle" class="w-full">Delete</BaseButton>
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
    </div>
</template>

<style scoped></style>
