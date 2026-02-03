import api from "@/api"
import type { LoginFormData, RegisterFormData, UserResponseData } from "@/features/auth/models"
import type { ApiResponse } from "@/shared/models"

// login

export async function getLoginFromApi(
    formLoginData: LoginFormData,
): Promise<ApiResponse<UserResponseData>> {
    const { email, password } = formLoginData

    const response = api.post<LoginFormData, ApiResponse<UserResponseData>>("/auth/login", {
        email,
        password,
    })

    const result = await response

    return result
}

export async function getRegisterFromApi(
    formLoginData: RegisterFormData,
): Promise<ApiResponse<UserResponseData>> {
    const { name, email, password, passwordConfirmation } = formLoginData

    const response = api.post<RegisterFormData, ApiResponse<UserResponseData>>("/auth/register", {
        name,
        email,
        password,
        password_confirmation: passwordConfirmation,
    })

    const result = await response

    return result
}

// logout

export async function getLogoutFromApi(): Promise<ApiResponse<null>> {
    const response = api.post<null, ApiResponse<null>>("/auth/logout")
    const result = await response
    return result
}
