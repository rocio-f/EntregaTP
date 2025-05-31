export interface Inscription
{
    id: string
    courseId: string
    studentId: string
}

export interface InscriptionCourses{
    id: string
    inscriptionId: string
    name: string
    professor: string
    modality: string
    level: number
    inscripted: boolean
}