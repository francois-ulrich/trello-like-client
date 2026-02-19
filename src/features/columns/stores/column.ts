import type { Column } from "@/features/columns/domain/column.model"
import { defineStore } from "pinia"
import { ref } from "vue"

export const useColumnStore = defineStore("column", () => {
    const items = ref<Column[]>([])
    return { items }
})
