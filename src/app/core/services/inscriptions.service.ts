import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { Inscription } from "../../modules/dashboard/modules/inscriptions/models";


@Injectable({ providedIn: 'root' })
export class InscriptionService{
constructor(private http: HttpClient){}

  getInscriptions(): Observable<Inscription[]> {
    const response = this.http.get<Inscription[]>(`http://localhost:3000/inscriptions`);
        return response
  }

  getInscriptionsByStudent(idStudent: string | undefined): Observable<Inscription[] | null> {
         const response = this.http
            .get<Inscription[]>(`http://localhost:3000/inscriptions?idStudent=${idStudent}`)
          return response
    }
}