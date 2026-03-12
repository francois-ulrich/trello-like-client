<script setup lang="ts">
import BoardOpenButtonBase from "@/shared/components/BoardOpenButtonBase.vue"
import type { Board } from "@/features/boards/domain/board.model"

const props = defineProps<{ board: Board }>()
</script>

<template>
    <BoardOpenButtonBase>
        <div class="flex flex-col-reverse h-full">
            <div class="bg-gray-200 p-2 flex-none">
                <h3 class="text-gray-800 font-semibold text-sm">{{ props.board.name }}</h3>
            </div>
            <div class="bg-linear-to-b from-gray-300 to-gray-400 to-100% flex-auto"></div>
        </div>
    </BoardOpenButtonBase>
</template>
