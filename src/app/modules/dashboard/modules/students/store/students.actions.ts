import { createActionGroup, createFeature, createReducer, emptyProps, props } from "@ngrx/store";
import { newStudent, Student } from "../models";

export interface StudentsState {
  students: Student[]; 
  loading: boolean;
  error: string | null;
}

const initialState: StudentsState = {
  students: [],
  loading: false,
  error: null,
};

const studentsReducer = createReducer(initialState)

export const studentsActions = createActionGroup({
  source: 'Students',
  events: {
    // Acciones sin argumentos, usamos emptyProps
    'Load Students': emptyProps(),
    // Accion satisfactoria
    'Load Students Success': props<{ Students: Student[] }>(), // Reemplaza 'any[]' con el tipo real de tus pedidos
    // Accion de error
    'Load Students Failure': props<{ error: string }>(),

    //////
    'Load Student By Id': props<{ id: string }>(),

    'Load Student By Id Succes': props<{ Student: Student}>(),

    'Load Student By Id Failure': props<{ error: string }>(),

    //////
    'Delete Student': props<{ id: string }>(),

    'Delete Student Succes':  props<{ Students: Student[] }>(),

    'Delete Student Failure': props<{ error: string }>(),

    //////
    'Create Student': props<{ Student: newStudent }>(),

    'Create Student Succes':  props<{ Students: Student[] }>(),

    'Create Student Failure': props<{ error: string }>(),
    
    //////
    'Edit Student': props<{ Student: Student }>(),

    'Edit Student Succes':  props<{ Students: Student[] }>(),

    'Edit Student Failure': props<{ error: string }>(),
  },
});
