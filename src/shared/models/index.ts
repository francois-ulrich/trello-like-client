import type { Board } from "@/features/boards/domain/board.model"

export interface ApiResponse<TResponse> {
    data: TResponse
    message?: string
}

export interface Repository<TModel, TCreateDTO, TUpdateDTO> {
    get: (id: number) => Promise<ApiResponse<TModel>>
    getAll: () => Promise<ApiResponse<Board[]>>
    create: (id: number, payload: TCreateDTO) => Promise<ApiResponse<Board>>
    update: (id: number, payload: TUpdateDTO) => Promise<ApiResponse<Board>>
    remove: (id: number) => Promise<ApiResponse<Board>>
}
