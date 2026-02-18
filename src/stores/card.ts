import { localCrudStore } from "@/stores/localCrudStore"
import type { Card } from "@/types/card"
import { defineStore } from "pinia"

export const useCardStore = defineStore("card", () => {
    const crud = localCrudStore<Card>()

    return { ...crud }
})
