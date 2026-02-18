import { localCrudStore } from "@/stores/localCrudStore"
import type { Column } from "@/types/column"
import { defineStore } from "pinia"

export const useColumnStore = defineStore("column", () => {
    const crud = localCrudStore<Column>()

    return { ...crud }
})
