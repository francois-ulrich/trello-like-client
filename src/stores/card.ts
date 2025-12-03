import { crudStore } from "@/stores/crudStore"
import type { Card } from "@/types/card"
import { defineStore } from "pinia"

export const useCardStore = defineStore("card", () => {
    const crud = crudStore<Card>()

    return { ...crud }
})
