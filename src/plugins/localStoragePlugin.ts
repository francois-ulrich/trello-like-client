import type { PiniaPluginContext } from "pinia"

interface LocalStoragePluginOptions {
    persistedStores: string[]
}

export function createLocalStoragePlugin(options: LocalStoragePluginOptions | undefined) {
    return (context: PiniaPluginContext) => {
        const { store } = context

        const persistedStoresIds: string[] = options !== undefined ? options.persistedStores : []

        const keyPrefix = `trelloLike-${store.$id}`

        const storedState = localStorage.getItem(keyPrefix)

        if (storedState) {
            store.$patch(JSON.parse(storedState))
        }

        store.$subscribe((_, state) => {
            if (persistedStoresIds.includes(store.$id)) {
                localStorage.setItem(keyPrefix, JSON.stringify(state))
            }
        })
    }
}

export default createLocalStoragePlugin
