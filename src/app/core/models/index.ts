export interface User{
    id: string,
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

export interface InscriptionCourses{
    courseId: string
    inscriptionId: string
    name: string
    professor: string
    modality: string
    level: number
    inscripted: boolean
}