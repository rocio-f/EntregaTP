export interface Inscription
{
    id: number
    idCourse: number
    idStudent: number
}

export interface InscriptionCourses{
    id: number
    idInscription: number
    name: string
    professor: string
    modality: string
    level: number
    inscripted: boolean
}