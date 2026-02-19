export interface ApiResponse<TResponse> {
    data: TResponse
    message?: string
}

export interface Repository<TModelDTO, TCreateDTO, TUpdateDTO> {
    get: (id: number) => Promise<ApiResponse<TModelDTO>>
    getAll: () => Promise<ApiResponse<TModelDTO[]>>
    create: (id: number, payload: TCreateDTO) => Promise<ApiResponse<TModelDTO>>
    update: (id: number, payload: TUpdateDTO) => Promise<ApiResponse<TModelDTO>>
    remove: (id: number) => Promise<ApiResponse<TModelDTO>>
}
