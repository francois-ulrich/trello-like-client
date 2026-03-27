import type {
    ForgotPasswordRequestDTO,
    LoginRequestDTO,
    RegisterRequestDTO,
} from "@/features/auth/infrastructure/auth.request.dto"
import type { UserResponseDTO } from "@/features/auth/infrastructure/auth.response.dto"
import type { ApiResponse } from "@/shared/models"
import api from "@/api"

export async function login(formLoginData: LoginRequestDTO): Promise<ApiResponse<UserResponseDTO>> {
    const response = await api.post<ApiResponse<UserResponseDTO>>("/auth/login", formLoginData)
    return response.data
}

export async function register(
    formLoginData: RegisterRequestDTO,
): Promise<ApiResponse<UserResponseDTO>> {
    const { name, email, password, passwordConfirmation } = formLoginData

    const response = await api.post<ApiResponse<UserResponseDTO>>("/auth/register", {
        name,
        email,
        password,
        password_confirmation: passwordConfirmation,
    })

    return response.data
}

export async function logout(): Promise<ApiResponse<null>> {
    const response = await api.post<ApiResponse<null>>("/auth/logout")
    return response.data
}

export async function fetchMe(): Promise<ApiResponse<UserResponseDTO>> {
    const response = await api.get<ApiResponse<UserResponseDTO>>("/auth/me")
    return response.data
}

export async function sendVerificationEmail(): Promise<ApiResponse<null>> {
    const response = await api.post<ApiResponse<null>>("/auth/verification-notification")
    return response.data
}

export async function sendPasswordChangeEmail(
    requestDto: ForgotPasswordRequestDTO,
): Promise<ApiResponse<null>> {
    const response = await api.post<ApiResponse<null>>("/auth/forgot-password", requestDto)
    return response.data
}

export const authApi = {
    login,
    register,
    logout,
    fetchMe,
    sendVerificationEmail,
    sendPasswordChangeEmail,
}
