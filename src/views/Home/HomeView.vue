<script setup lang="ts">
import BoardItemBase from "@/components/BoardItemBase.vue"
import { useBoardStore } from "@/features/boards/stores/board.store"
import type { Board } from "@/features/boards/domain/board.model"
import { computed } from "vue"

import { useAuthStore } from "@/features/auth/stores/authStore"
import BoardCreationButton from "@/features/boards/components/BoardCreationButton.vue"

const authStore = useAuthStore()
const boardStore = useBoardStore()

const boards = computed<Board[]>(() => boardStore.items)
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
                    <BoardCreationButton />
                </li>
            </ul>
        </div>
    </div>
</template>
