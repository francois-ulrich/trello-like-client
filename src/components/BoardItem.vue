<script setup lang="ts">
import BoardColumn from "@/components/ColumnItem.vue"
import type { Board } from "@/types/board"
import ColumnCreation from "@/components/ColumnCreation.vue"

const props = defineProps<{ board: Board }>()
</script>

<template>
    <div>
        <div class="p-4 flex flex-col gap-y-4 bg-gray-200">
            <p class="text-lg font-medium">{{ props.board.name }}</p>
        </div>
        <div class="p-4 flex flex-col gap-y-4">
            <div>
                <ul class="flex flex-row gap-x-4">
                    <li v-for="column in props.board.columns">
                        <BoardColumn
                            v-model:cards="column.cards"
                            :column="column"
                            :boardId="props.board.id"
                        />
                    </li>
                </ul>

                <ColumnCreation :boardId="props.board.id" />
            </div>
        </div>
    </div>
</template>

<style scoped></style>
