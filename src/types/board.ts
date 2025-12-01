import type { Column } from "@/types/column"

export interface Board {
    id: string
    name: string
    columns: Column[]
}
