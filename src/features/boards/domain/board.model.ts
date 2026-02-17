export interface Board {
    id: number
    name: string
    isSynchronized: boolean
}

export interface CreateBoardDTO {
    name: string
}

export interface UpdateBoardDTO {
    name: string
}
