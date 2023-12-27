export interface IGift {
    id?: number
    title: string
    url: string
    date: Date | null
}

export interface User {
    id: string
    first_name: string
    last_name: string
    email: string
    birth_date: string
}

export interface SignUp extends User {
    password: string
    password_confirm: string
}

export interface LoginUser {
    email: string
    password: string
}