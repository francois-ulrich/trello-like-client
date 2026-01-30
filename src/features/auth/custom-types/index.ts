import type { LoginFormData, LoginResponse } from "@/features/auth/models"
import type { PostOne } from "@/shared/models/custom.types"

export type PostOneUser = PostOne<LoginFormData, LoginResponse>
