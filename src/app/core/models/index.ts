export interface User{
    id: string,
    name: String,
    lastName: String,
    grade: String,
    role: string;
    token: string
}

export interface registerUser {
    name: String,
    lastName: String,
    email: string,
    password: string, 
    token: string
}
