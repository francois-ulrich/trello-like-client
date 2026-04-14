import type {
    ColumnMoveRequestDTO,
    CreateColumnRequestDTO,
    UpdateColumnRequestDTO,
} from "@/features/columns/infrastructure/column.request.dto"
export interface Column {
    id: number
    boardId: number
    name: string
    position: number
}

export interface ColumnStore {
    items: Column[]
    getById(id: number): Column | undefined
    create(boardId: number, payload: CreateColumnRequestDTO): Promise<void>
    update(boardId: number, columnId: number, payload: UpdateColumnRequestDTO): Promise<void>
    move(columnId: number, payload: ColumnMoveRequestDTO): Promise<void>
    remove(boardId: number, columnId: number): Promise<void>
}
