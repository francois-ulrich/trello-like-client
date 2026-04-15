import { AppStoresKey } from "@/shared/stores/appstoresKey"
import { createStores } from "@/shared/stores/storeFactory"
import type { StoreMode } from "@/shared/types/stores"
import { provide } from "vue"

export function provideStores(mode: StoreMode) {
    const stores = createStores(mode)
    provide(AppStoresKey, stores)
}
