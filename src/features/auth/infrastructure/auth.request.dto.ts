export interface LoginRequestDTO {
    email: string
    password: string
}

export interface RegisterRequestDTO {
    name: string
    email: string
    password: string
    passwordConfirmation: string
}

export interface ForgotPasswordRequestDTO {
    email: string
}
