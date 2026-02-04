export interface ApiResponse<TResponse> {
    data: TResponse
    message?: string
}
