import { useAuthStore } from "@/features/auth/stores/authStore"
import type { PiniaPluginContext } from "pinia"

interface LocalStoragePluginOptions {
    ignoredStores: string[]
}

export function createLocalStoragePlugin(options: LocalStoragePluginOptions | undefined) {
    return (context: PiniaPluginContext) => {
        const { store } = context
        const authStore = useAuthStore()

        const ignoredStoreIds: string[] = options !== undefined ? options.ignoredStores : []

        const keyPrefix = `trelloLike-${store.$id}`

        const storedState = localStorage.getItem(keyPrefix)

        if (authStore.isAuthenticated && storedState) {
            store.$patch(JSON.parse(storedState))
        }

        store.$subscribe((_, state) => {
            if (authStore.isAuthenticated && !ignoredStoreIds.includes(store.$id)) {
                localStorage.setItem(keyPrefix, JSON.stringify(state))
                console.log("hey")
            }
        })
    }
}

export default createLocalStoragePlugin
