export interface ApiResponse<TResponse> {
    data: {
        data: TResponse
        message: string
    }
}
