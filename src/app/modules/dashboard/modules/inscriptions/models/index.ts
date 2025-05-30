export interface Inscription
{
    id: string
    courseId: string
    studentId: string
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