<script setup lang="ts">
import { useStores } from "@/composables/useStores"
import BoardCreationButton from "@/features/boards/components/BoardCreationButton.vue"
import BoardOpenButtonBase from "@/shared/components/BoardOpenButtonBase.vue"
import { computed } from "vue"

const { mode, boardStore } = useStores()
const boardRouteName = computed(() => (mode === "api" ? `board` : `guest/board`))
</script>

<template>
    <ul class="flex flex-row gap-4 flex-auto overflow-x-auto pb-4 w-full">
        <li v-for="board in boardStore.items">
            <BoardOpenButtonBase>
                <RouterLink :to="{ name: boardRouteName, params: { id: board.id } }">
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
            </BoardOpenButtonBase>
        </li>
        <li>
            <BoardCreationButton />
        </li>
    </ul>
</template>
