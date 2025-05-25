export interface User{
    id: number,
    name: String,
    lastName: String,
    grade: String,
    email: string
    password: string
    role: string
    token: string
}

export interface registerUser {
    name: String,
    lastName: String,
    email: string,
    password: string, 
    token: string
}
