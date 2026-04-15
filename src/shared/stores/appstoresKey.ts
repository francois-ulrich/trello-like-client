import type { AppStores } from "@/shared/types/stores"
import type { InjectionKey } from "vue"

export const AppStoresKey: InjectionKey<AppStores> = Symbol("AppStores")
