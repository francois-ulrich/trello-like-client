import type { ColumnResponseDTO } from "@/features/columns/infrastructure/column.dto"

export interface BoardResponseDTO {
    id: number
    name: string
    columns: ColumnResponseDTO[]
}

export interface CreateBoardResponseDTO {
    name: string
}

export interface UpdateBoardResponseDTO {
    name: string
}
