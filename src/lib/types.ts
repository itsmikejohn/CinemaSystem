export type NavSelection = {
    name: string
    url: string
}

export type ResultsType<T> = {
    data: T
    status: number
    type: string
}

export type UserDATA = {
    email: string
    fullName: string
    role: string
}