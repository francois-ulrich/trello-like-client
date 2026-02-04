import type { PiniaPluginContext } from "pinia"

interface LocalStoragePluginOptions {
    ignoredStores: string[]
}

export function createLocalStoragePlugin(options: LocalStoragePluginOptions | undefined) {
    return (context: PiniaPluginContext) => {
        const { store } = context

        const ignoredStoreIds: string[] = options !== undefined ? options.ignoredStores : []

        const keyPrefix = `trelloLike-${store.$id}`

        const storedState = localStorage.getItem(keyPrefix)

        if (storedState) {
            store.$patch(JSON.parse(storedState))
        }

        store.$subscribe((_, state) => {
            if (ignoredStoreIds.includes(store.$id)) return
            localStorage.setItem(keyPrefix, JSON.stringify(state))
        })
    }
}

export default createLocalStoragePlugin
