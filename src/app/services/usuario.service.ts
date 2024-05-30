import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs';
import { Usuario } from '../interfaces/usuario';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  private myAppUrl: string;
  private myApiUrl: string;

  constructor(private http: HttpClient) { 
    this.myAppUrl = environment.endpoint;
    this.myApiUrl = "usuario/";
   }

   get_listar(): Observable<Usuario[]>{
    return this.http.get<Usuario[]>(`${this.myAppUrl}${this.myApiUrl}`);
   }

   userDelete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.myAppUrl}${this.myApiUrl}${id}`)
  }

  saveUser(usua: Usuario): Observable<void> {
    return this.http.post<void>(`${this.myAppUrl}${this.myApiUrl}`,usua)
  }

  getUser(id: number): Observable<Usuario> {
    return this.http.get<Usuario>(`${this.myAppUrl}${this.myApiUrl}${id}`)
  }

  updateUser(id: number, usua: Usuario): Observable<void> {
    return this.http.put<void>(`${this.myAppUrl}${this.myApiUrl}${id}`, usua);
  }
}
