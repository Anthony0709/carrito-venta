import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs';
import { Marca } from '../interfaces/marca';

@Injectable({
  providedIn: 'root'
})
export class MarcaService {

  private myAppUrl: string;
  private myApiUrl: string;

  constructor(private http: HttpClient) {
    this.myAppUrl = environment.endpoint;
    this.myApiUrl = "marca/";
   }

   get_lis_marca(): Observable<Marca[]>{
    return this.http.get<Marca[]>(`${this.myAppUrl}${this.myApiUrl}`);
   }

   delete_marca(idMarca: number): Observable<void>{
    return this.http.delete<void>(`${this.myAppUrl}${this.myApiUrl}${idMarca}`);
   }

   save_marca(marca: Marca): Observable<void>{
    return this.http.post<void>(`${this.myAppUrl}${this.myApiUrl}`,marca);
   }

   get_marca(idMarca: number): Observable<Marca>{
    return this.http.get<Marca>(`${this.myAppUrl}${this.myApiUrl}${idMarca}`);
   }

   update_marca(idMarca: number, marca: Marca): Observable<void>{
    return this.http.put<void>(`${this.myAppUrl}${this.myApiUrl}${idMarca}`,marca);
   }
}
