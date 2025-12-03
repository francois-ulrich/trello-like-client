import { crudStore } from "@/stores/crudStore"
import type { Column } from "@/types/column"
import { defineStore } from "pinia"

export const useColumnStore = defineStore("column", () => {
    const crud = crudStore<Column>()

    return { ...crud }
})
