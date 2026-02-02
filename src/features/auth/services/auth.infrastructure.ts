import api from "@/api"
import type { LoginFormData, LoginResponse, RegisterFormData } from "@/features/auth/models"
import type { AxiosResponse } from "axios"

// login

export async function getLoginFromApi(formLoginData: LoginFormData): Promise<LoginResponse> {
    const { email, password } = formLoginData

    const response = api.post<LoginResponse>("/auth/login", {
        email,
        password,
    })

    const result = await response

    return result.data
}

export async function getAuthenticatedUserFromApi(): Promise<AxiosResponse<LoginResponse>> {
    const response = api.get<LoginResponse>("/me")
    const result = await response
    return result
}

// register

export async function getRegisterFromApi(formLoginData: RegisterFormData): Promise<LoginResponse> {
    const { name, email, password, passwordConfirmation } = formLoginData

    const response = api.post<LoginResponse>("/auth/register", {
        name,
        email,
        password,
        password_confirmation: passwordConfirmation,
    })

    const result = await response

    return result.data
}
