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

export type MoviesDataTypes = {
    id: number
    created_at: string
    movie_name: string
    ticket_quantity: string
    uid: string
}