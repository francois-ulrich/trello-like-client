import type { LoginFormData, LoginResponse, RegisterFormData } from "@/features/auth/models"
import {
    getAuthenticatedUserFromApi,
    getLoginFromApi,
    getRegisterFromApi,
} from "./auth.infrastructure"
import type { PostOneUser, RegisterOneUser } from "@/features/auth/custom-types"

async function logIn(formData: LoginFormData, api: PostOneUser): Promise<LoginResponse> {
    const result = await api(formData)
    return result
}

async function register(formData: RegisterFormData, api: RegisterOneUser): Promise<LoginResponse> {
    const result = await api(formData)
    return result
}

function factoryLogInUser(formData: LoginFormData): Promise<LoginResponse> {
    return logIn(formData, getLoginFromApi)
}

function factoryRegisterUser(formData: RegisterFormData): Promise<LoginResponse> {
    return register(formData, getRegisterFromApi)
}

const business = {
    getAuthenticatedUser: getAuthenticatedUserFromApi,
    login: factoryLogInUser,
    register: factoryRegisterUser,
}

export default business
