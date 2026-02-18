export interface ApiResponse<TResponse> {
    data: TResponse
    message?: string
}

export interface Repository<TModel, TCreateDTO, TUpdateDTO> {
    get: (id: number) => Promise<ApiResponse<TModel>>
    getAll: () => Promise<ApiResponse<TModel[]>>
    create: (id: number, payload: TCreateDTO) => Promise<ApiResponse<TModel>>
    update: (id: number, payload: TUpdateDTO) => Promise<ApiResponse<TModel>>
    remove: (id: number) => Promise<ApiResponse<TModel>>
}
