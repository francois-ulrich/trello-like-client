import api from "@/api"
import type { LoginFormData, RegisterFormData, UserResponseData } from "@/features/auth/models"
import type { ApiResponse } from "@/shared/models"

// login

export async function getLoginFromApi(
    formLoginData: LoginFormData,
): Promise<ApiResponse<UserResponseData>> {
    const response = await api.post<ApiResponse<UserResponseData>>("/auth/login", formLoginData)
    return response.data
}

export async function getRegisterFromApi(
    formLoginData: RegisterFormData,
): Promise<ApiResponse<UserResponseData>> {
    const { name, email, password, passwordConfirmation } = formLoginData

    const response = await api.post<ApiResponse<UserResponseData>>("/auth/register", {
        name,
        email,
        password,
        password_confirmation: passwordConfirmation,
    })

    return response.data
}

// logout

export async function getLogoutFromApi(): Promise<ApiResponse<null>> {
    const response = await api.post<ApiResponse<null>>("/auth/logout")
    return response.data
}
