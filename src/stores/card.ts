import { crudStore } from "@/stores/crudStore"
import type { Card } from "@/types/card"
import { defineStore } from "pinia"

export const useBoardStore = defineStore("board", () => {
    const crud = crudStore<Card>()

    return { ...crud }
})
