import { environment } from './../../environment/environment';
import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Libro } from '../models/libro.model';


@Injectable({
  providedIn: 'root'
})
export class BibliotecaService {
  private http = inject(HttpClient);
  private apiUrl = environment.url;

  /**
   */
  obtenerLibros(): Observable<Libro[]> {
    return this.http.get<Libro[]>(`${this.apiUrl}/inventario`);
  }

  /**
   */
  obtenerLibroPorId(id: string): Observable<Libro> {
    // Hace un GET a /inventario/ID_DEL_LIBRO
    return this.http.get<Libro>(`${this.apiUrl}/inventario/${id}`);
  }

  /**
   */
  crearLibro(libro: Libro): Observable<Libro> {
    return this.http.post<Libro>(`${this.apiUrl}/inventario`, libro);
  }

  //
   //Actualiza libro
  actualizarLibro(id: string, libro: Libro): Observable<Libro> {
    return this.http.put<Libro>(`${this.apiUrl}/inventario/${id}`, libro);
  }

  /**
   * Borra un libro por su ID.
   */
  eliminarLibro(id: string): Observable<any> {
    return this.http.delete(`${this.apiUrl}/inventario/${id}`);
  }
}
