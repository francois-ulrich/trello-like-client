import { useAuthStore } from "@/features/auth/stores/authStore"
import type { CardStore } from "@/features/cards/domain/card.model"
import { useApiCardStore } from "@/features/cards/stores/card.store.api"
import { useLocalCardStore } from "@/features/cards/stores/card.store.local"
import { computed } from "vue"

export function useCardStore() {
    const authStore = useAuthStore()
    const apiStore = useApiCardStore()
    const localStore = useLocalCardStore()

    const isAuthenticated = computed(() => !!authStore.isAuthenticated)

    return computed<CardStore>(() => (isAuthenticated.value ? apiStore : localStore)).value
}
