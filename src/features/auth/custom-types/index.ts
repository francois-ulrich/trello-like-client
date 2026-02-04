import type { LoginFormData, UserResponseData, RegisterFormData } from "@/features/auth/models"
import type { GetOne, Post, PostOne } from "@/shared/custom-types"
import type { ApiResponse } from "@/shared/models"

export type PostOneUser = PostOne<LoginFormData, ApiResponse<UserResponseData>>
export type RegisterOneUser = PostOne<RegisterFormData, ApiResponse<UserResponseData>>
export type LogoutOneUser = Post<ApiResponse<null>>
export type GetOneUser = GetOne<ApiResponse<UserResponseData>>
