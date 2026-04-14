import { useAuthStore } from "@/features/auth/stores/authStore"
import type { BoardStore } from "@/features/boards/domain/board.model"
import { useApiBoardStore } from "@/features/boards/stores/board.store.api"
import { useLocalBoardStore } from "@/features/boards/stores/board.store.local"
import { computed } from "vue"

export function useBoardStore() {
    const authStore = useAuthStore()
    const apiStore = useApiBoardStore()
    const localStore = useLocalBoardStore()

    const isAuthenticated = computed(() => !!authStore.isAuthenticated)

    return computed<BoardStore>(() => {
        return isAuthenticated.value ? apiStore : localStore
    }).value
}
