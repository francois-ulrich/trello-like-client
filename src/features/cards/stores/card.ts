import type { Card } from "@/features/cards/domain/card.model"
import { defineStore } from "pinia"
import { ref, type Ref } from "vue"

export const useCardStore = defineStore("card", () => {
    const items = ref<Card[]>([]) as Ref<Card[]>

    return { items }
})
