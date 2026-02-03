import type { LoginFormData, RegisterFormData, UserResponseData } from "@/features/auth/models"
import { getLoginFromApi, getRegisterFromApi, getLogoutFromApi } from "./auth.infrastructure"
import type { LogoutOneUser, PostOneUser, RegisterOneUser } from "@/features/auth/custom-types"
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

// factories

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
    // getAuthenticatedUser: getAuthenticatedUserFromApi,
    login: factoryLogInUser,
    logout: factoryLogOutUser,
    register: factoryRegisterUser,
}

export default business
