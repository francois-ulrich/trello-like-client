import type { ColumnResponseDTO } from "@/features/columns/infrastructure/column.dto"

export interface CreateBoardDTO {
    name: string
}

export interface UpdateBoardDTO {
    name: string
}

export interface BoardResponseDTO {
    id: number
    name: string
    columns: ColumnResponseDTO[]
}
