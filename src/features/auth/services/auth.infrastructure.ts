import api from "@/api"
import type { LoginFormData, LoginResponse } from "@/features/auth/models"
import type { AxiosResponse } from "axios"

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
    const response = api.get<LoginResponse>("/user")
    const result = await response
    return result
}
