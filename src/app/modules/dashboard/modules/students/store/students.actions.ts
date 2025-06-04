import { createActionGroup, createFeature, createReducer, emptyProps, props } from "@ngrx/store";
import { Student } from "../models";

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
  },
});
