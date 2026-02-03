export type User = {
    name: string
    email: string
}

export interface LoginFormData {
    email: string
    password: string
}

export interface RegisterFormData {
    name: string
    email: string
    password: string
    passwordConfirmation: string
}

export interface UserResponseData {
    user: User
}
