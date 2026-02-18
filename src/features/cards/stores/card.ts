import type { Card } from "@/features/cards/domain/card.model"
import { defineStore } from "pinia"
import { ref, type Ref } from "vue"

export const useCardStore = defineStore("card", () => {
    // const crud = crudStore<Column>()

    const items = ref<Card[]>([]) as Ref<Card[]>

    // return { ...crud, items }
    return { items }
})
