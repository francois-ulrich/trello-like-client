import {
    getLoginFromApi,
    getRegisterFromApi,
    getLogoutFromApi,
    getMeFromApi,
} from "./auth.infrastructure"
import type {
    GetOneUser,
    LogoutOneUser,
    PostOneUser,
    RegisterOneUser,
} from "@/features/auth/custom-types"
import type { ApiResponse } from "@/shared/models"
import type { UserResponseDTO } from "@/features/auth/infrastructure/auth.response.dto"
import type {
    LoginRequestDTO,
    RegisterRequestDTO,
} from "@/features/auth/infrastructure/auth.request.dto"

async function register(
    formData: RegisterRequestDTO,
    api: RegisterOneUser,
): Promise<ApiResponse<UserResponseDTO>> {
    const result = await api(formData)
    return result
}

async function login(
    formData: LoginRequestDTO,
    api: PostOneUser,
): Promise<ApiResponse<UserResponseDTO>> {
    const result = await api(formData)
    return result
}

async function logout(api: LogoutOneUser): Promise<ApiResponse<null>> {
    const result = await api()
    return result
}

async function getMe(api: GetOneUser): Promise<ApiResponse<UserResponseDTO>> {
    const result = await api()
    return result
}

// factories

function factoryGetMe(): Promise<ApiResponse<UserResponseDTO>> {
    return getMe(getMeFromApi)
}

function factoryRegisterUser(formData: RegisterRequestDTO): Promise<ApiResponse<UserResponseDTO>> {
    return register(formData, getRegisterFromApi)
}

function factoryLogInUser(formData: LoginRequestDTO): Promise<ApiResponse<UserResponseDTO>> {
    return login(formData, getLoginFromApi)
}

function factoryLogOutUser(): Promise<ApiResponse<null>> {
    return logout(getLogoutFromApi)
}

const business = {
    getMe: factoryGetMe,
    login: factoryLogInUser,
    logout: factoryLogOutUser,
    register: factoryRegisterUser,
}

export default business
