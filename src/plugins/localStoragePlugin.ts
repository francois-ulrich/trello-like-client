import type { PiniaPluginContext } from "pinia"

const localStoragePlugin = (context: PiniaPluginContext) => {
    const { store } = context

    const keyPrefix = `trelloLike-${store.$id}`

    const storedState = localStorage.getItem(keyPrefix)

    if (storedState) {
        store.$patch(JSON.parse(storedState))
    }

    store.$subscribe((_, state) => {
        localStorage.setItem(keyPrefix, JSON.stringify(state))
    })
}

export default localStoragePlugin
