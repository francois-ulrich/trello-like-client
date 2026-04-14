import type { UserPermissions } from "@/features/auth/models"
import type {
    CreateBoardRequestDTO,
    UpdateBoardRequestDTO,
} from "@/features/boards/infrastructure/board.request.dto"
import type { Column } from "@/features/columns/domain/column.model"

export interface Board {
    id: number
    name: string
    can: UserPermissions
}

export interface BoardStore {
    items: Board[]
    getById(id: number): Board | undefined
    getColumnsInBoard(boardId: number): Column[]
    getByColumnId(columnId: number): Board | undefined
    loadAll(): Promise<void>
    loadById(id: number): Promise<void>
    ensureBoardIsLoaded(id: number): Promise<void>
    create(payload: CreateBoardRequestDTO): Promise<void>
    update(boardId: number, payload: UpdateBoardRequestDTO): Promise<void>
    remove(boardId: number): Promise<void>
    canEdit(boardId: number): boolean
}
