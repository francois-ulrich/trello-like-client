import type { ColumnResponseDTO } from "@/features/columns/infrastructure/column.response.dto"

export interface BoardResponseDTO {
    id: number
    name: string
    columns: ColumnResponseDTO[]
}
