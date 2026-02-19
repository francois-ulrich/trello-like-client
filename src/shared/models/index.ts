import type { Ref } from "vue"

export interface ApiResponse<TResponse> {
    data: TResponse
    message?: string
}

export interface Repository<T, TModelDTO, TCreateRequestDTO, TUpdateRequestDTO> {
    items: Ref<T[]>
    get: (id: number) => Promise<ApiResponse<TModelDTO>>
    getAll: () => Promise<ApiResponse<TModelDTO[]>>
    create: (id: number, payload: TCreateRequestDTO) => Promise<ApiResponse<TModelDTO>>
    update: (id: number, payload: TUpdateRequestDTO) => Promise<ApiResponse<TModelDTO>>
    remove: (id: number) => Promise<ApiResponse<TModelDTO>>
}
