import type { LoginFormData, LoginResponse, RegisterFormData } from "@/features/auth/models"
import type { PostOne } from "@/shared/models/custom.types"

export type PostOneUser = PostOne<LoginFormData, LoginResponse>
export type RegisterOneUser = PostOne<RegisterFormData, LoginResponse>
