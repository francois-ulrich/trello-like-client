import type { Board } from "@/features/boards/domain/board.model"
import type { BoardResponseDTO } from "@/features/boards/infrastructure/board.response.dto"
import type { Card } from "@/features/cards/domain/card.model"
import type { Column } from "@/features/columns/domain/column.model"

export function mapApiBoards(data: BoardResponseDTO[]): {
    boards: Board[]
    columns: Column[]
    cards: Card[]
} {
    const boards: Board[] = data.map((board) => ({
        id: board.id,
        name: board.name,
    }))

    const columns: Column[] = data.flatMap((board) =>
        board.columns.map((column) => ({
            id: column.id,
            name: column.name,
            position: column.position,
            boardId: column.board_id,
        })),
    )

    const cards: Card[] = data.flatMap((board) =>
        board.columns.flatMap((column) =>
            column.cards.map((card) => ({
                id: card.id,
                name: card.name,
                description: card.description,
                position: card.position,
                columnId: card.column_id,
            })),
        ),
    )

    return { boards, columns, cards }
}
