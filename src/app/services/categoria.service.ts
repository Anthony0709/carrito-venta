import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs';
import { Categoria } from '../interfaces/categoria';

@Injectable({
  providedIn: 'root'
})
export class CategoriaService {

  private myAppUrl: string;
  private myApiUrl: string;

  constructor( private http: HttpClient) {
    this.myAppUrl = environment.endpoint;
    this.myApiUrl = "categoria/";
   }

   getLis_categoria():Observable<Categoria[]>{
    return this.http.get<Categoria[]>(`${this.myAppUrl}${this.myApiUrl}`);
   }

   delete_categoria(idCategoria: number): Observable<void>{
    return this.http.delete<void>(`${this.myAppUrl}${this.myApiUrl}${idCategoria}`);
   }

   save_categoria(category: Categoria): Observable<void>{
    return this.http.post<void>(`${this.myAppUrl}${this.myApiUrl}`,category);
   }

   get_categoria(idCategoria: number): Observable<Categoria>{
    return this.http.get<Categoria>(`${this.myAppUrl}${this.myApiUrl}${idCategoria}`);
   }

   update_categoria(idCategoria: number, category: Categoria): Observable<void>{
    return this.http.put<void>(`${this.myAppUrl}${this.myApiUrl}${idCategoria}`,category);
   }

}
