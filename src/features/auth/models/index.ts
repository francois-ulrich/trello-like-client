export type User = {
    name: string
    email: string
}

export interface LoginFormData {
    email: string
    password: string
}

export interface LoginResponse {
    data: LoginFormData
}
