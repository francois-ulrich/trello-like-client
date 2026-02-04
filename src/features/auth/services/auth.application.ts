import type { LoginFormData, RegisterFormData, UserResponseData } from "@/features/auth/models"
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

async function register(
    formData: RegisterFormData,
    api: RegisterOneUser,
): Promise<ApiResponse<UserResponseData>> {
    const result = await api(formData)
    return result
}

async function login(
    formData: LoginFormData,
    api: PostOneUser,
): Promise<ApiResponse<UserResponseData>> {
    const result = await api(formData)
    return result
}

async function logout(api: LogoutOneUser): Promise<ApiResponse<null>> {
    const result = await api()
    return result
}

async function getMe(api: GetOneUser): Promise<ApiResponse<UserResponseData>> {
    const result = await api()
    return result
}

// factories

function factoryGetMe(): Promise<ApiResponse<UserResponseData>> {
    return getMe(getMeFromApi)
}

function factoryRegisterUser(formData: RegisterFormData): Promise<ApiResponse<UserResponseData>> {
    return register(formData, getRegisterFromApi)
}

function factoryLogInUser(formData: LoginFormData): Promise<ApiResponse<UserResponseData>> {
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
