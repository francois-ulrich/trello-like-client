<script setup lang="ts">
import type { Board } from "@/types/board"
import { computed } from "vue"
import { useColumnStore } from "@/stores/column"
import ColumnCreation from "@/views/Board/ColumnCreation.vue"
import ColumnItem from "@/views/Board/ColumnItem.vue"

const props = defineProps<{ board: Board }>()

const columns = computed(() => {
    return columnStore.items.filter((column) => column.boardId === props.board.id)
})
const columnStore = useColumnStore()
</script>

<template>
    <div class="h-screen flex flex-col">
        <div class="p-4 flex flex-col gap-y-4 bg-gray-200 flex-none">
            <p class="text-lg font-medium">{{ board.name }}</p>
        </div>
        <div class="p-4 flex flex-col gap-y-4 overflow-x-auto flex-auto">
            <div>
                <ul class="flex flex-row gap-x-4">
                    <li v-for="column in columns">
                        <ColumnItem :column="column" />
                    </li>

                    <li><ColumnCreation :boardId="props.board.id" /></li>
                </ul>
            </div>
        </div>
    </div>
</template>

<style scoped></style>
