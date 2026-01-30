import type { LoginFormData, LoginResponse } from "@/features/auth/models"
import { getAuthenticatedUserFromApi, getLoginFromApi } from "./auth.infrastructure"
import type { PostOneUser } from "@/features/auth/custom-types"

async function logIn(formData: LoginFormData, api: PostOneUser): Promise<LoginResponse> {
    const result = await api(formData)
    return result
}

function factoryLogInUser(loginFormData: LoginFormData): Promise<LoginResponse> {
    return logIn(loginFormData, getLoginFromApi)
}

const business = {
    getAuthenticatedUser: getAuthenticatedUserFromApi,
    login: factoryLogInUser,
}

export default business
