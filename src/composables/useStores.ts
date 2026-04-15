import { AppStoresKey } from "@/shared/stores/appstoresKey"
import { inject } from "vue"

export function useStores() {
    const stores = inject(AppStoresKey)

    if (!stores) {
        throw new Error("Stores not provided")
    }

    return stores
}
