<script setup lang="ts">
import BoardItemBase from "@/components/BoardItemBase.vue"
import type { Board } from "@/types/board"

const props = defineProps<{ board: Board }>()
</script>

<template>
    <BoardItemBase>
        <div class="flex flex-col-reverse h-full">
            <div class="bg-gray-200 p-2 flex-none">
                <h3 class="text-gray-800 font-semibold text-sm">{{ props.board.name }}</h3>
            </div>
            <div class="bg-linear-to-b from-gray-300 to-gray-400 to-100% flex-auto"></div>
        </div>
    </BoardItemBase>
</template>
