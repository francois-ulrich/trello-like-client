import { useAuthStore } from "@/features/auth/stores/authStore"
import type { ColumnStore } from "@/features/columns/domain/column.model"
import { useApiColumnStore } from "@/features/columns/stores/column.store.api"
import { useLocalColumnStore } from "@/features/columns/stores/column.store.local"
import { computed } from "vue"

export function useColumnStore() {
    const authStore = useAuthStore()
    const apiStore = useApiColumnStore()
    const localStore = useLocalColumnStore()

    const isAuthenticated = computed(() => !!authStore.isAuthenticated)

    return computed<ColumnStore>(() => (isAuthenticated.value ? apiStore : localStore)).value
}
