import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BibliotecaService } from '../../services/biblioteca.service';
import { Libro } from '../../models/libro.model';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-lista',
  standalone: true,
  imports: [CommonModule, RouterLink],
  template: `
    <div class="min-h-screen bg-gray-100 p-6 md:p-10 font-sans">
      <div class="max-w-5xl mx-auto">

        <!-- Header -->
        <header class="flex justify-between items-center mb-10 border-b-4 border-indigo-400 pb-3">
          <h2 class="text-4xl font-black text-indigo-800 tracking-tight">
            📚 Mi Biblioteca Digital
          </h2>

          <!-- Boton para Navegar a Crear Libro -->
          <a [routerLink]="['/crear-libro']"
             class="px-5 py-2 bg-indigo-600 text-white font-semibold rounded-full shadow-lg transition duration-200 ease-in-out hover:bg-indigo-700 hover:shadow-xl transform hover:scale-105">
            + Añadir Libro Nuevo
          </a>
        </header>

        <!-- ESTADOS DE CARGA / ERROR -->
        @if (!libros) {
          <div class="text-center p-12 bg-white rounded-lg shadow-lg">
            <p class="text-gray-500 font-semibold text-lg animate-pulse">Cargando libros... ¡Ya casi!</p>
          </div>
        }

        <!-- LISTA DE LIBROS -->
        @if (libros && libros.length > 0) {
          <ul class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            @for (libro of libros; track libro.id) {
              <li class="bg-white p-6 shadow-xl rounded-2xl border border-gray-200
                         transition duration-300 ease-in-out hover:shadow-2xl hover:border-indigo-400">

                <div class="flex flex-col space-y-4">

                  <!-- TÍTULO Y AUTOR -->
                  <div class="flex-grow">
                    <h3 class="text-2xl font-bold text-gray-900 mb-1">{{ libro.titulo }}</h3>
                    <p class="text-md text-indigo-600 font-medium">Por: {{ libro.autor }}</p>
                  </div>

                  <!-- AÑO Y ACCIONES -->
                  <div class="flex items-center justify-between pt-3 border-t border-gray-100">

                    <!-- AÑO -->
                    <span class="text-sm font-bold text-gray-500 bg-gray-200 rounded-full px-4 py-1">
                      {{ libro.anio }}
                    </span>

                    <!-- botones-->
                    <div class="flex items-center space-x-2">

                      <!-- Boton de Detalle -->
                      <a [routerLink]="['/libro', libro.id]"
                         class="text-blue-500 hover:text-white transition duration-150 p-2 rounded-full hover:bg-blue-500 bg-blue-100"
                         title="Ver Detalle">
                        <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.477 0 8.268 2.943 9.542 7-1.274 4.057-5.065 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"></path></svg>
                      </a>

                      <!-- Boton de Editar -->
                      <a [routerLink]="['/editar-libro', libro.id]"
                         class="text-teal-500 hover:text-white transition duration-150 p-2 rounded-full hover:bg-teal-500 bg-teal-100"
                         title="Editar Libro">
                         <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-7-3l-4 4L8 16l4-4 4-4-4-4z"></path></svg>
                      </a>

                      <!-- Boton de Eliminar -->
                      <button (click)="eliminarLibro(libro.id!)"
                              class="text-red-500 hover:text-white transition duration-150 p-2 rounded-full hover:bg-red-500 bg-red-100 focus:outline-none"
                              title="Eliminar Libro">
                        <!-- Icono de bote de basura -->
                        <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path></svg>
                      </button>
                    </div>
                  </div>
                </div>
              </li>
            }
          </ul>
        } @else if (libros && libros.length === 0) {
          <!-- Si carga pero no hay libros-->
          <div class="text-center p-12 mt-10 bg-yellow-100 border-l-8 border-yellow-500 text-yellow-800 rounded-xl shadow-lg">
            <p class="font-bold text-2xl mb-2">¡Ups! Servidor Vacío</p>
            <p class="text-lg">No encontré libros. ¡Es hora de darle vida a tu biblioteca!</p>
          </div>
        }
      </div>
    </div>
  `,
  styles: [] // Estilos con Tailwind
})
export class ListaComponent implements OnInit {
  private bibliotecaService = inject(BibliotecaService);
  libros: Libro[] | null = null;

  ngOnInit(): void {
    this.cargarLibros(); // Cargamos la lista al inicio

  }

  // Esta función pide libros al servidor
  cargarLibros(): void {
    this.libros = null; // Ponemos la lista a null para que muestre "Cargando..."
    this.bibliotecaService.obtenerLibros().subscribe({
      next: (data) => {
        this.libros = data; // Guardamos los libros que vinieron del servidor
      },
      error: (err) => {
        this.libros = [];
        console.error('Error feo al cargar los libros. Revisa tu puerto 3000:', err);
      }
    });
  }

  // Función para borrar un libro
  eliminarLibro(id: string): void {
    // Le preguntamos al usuario si está seguro (usa el 'confirm' del navegador)
    if (!confirm('¡Oye! ¿De verdad quieres borrar este libro? No hay vuelta atrás.')) {
      return;
    }

    this.bibliotecaService.eliminarLibro(id).subscribe({
      next: () => {
        console.log(`Libro con ID ${id} se fue para siempre.`);
        // Importante: Volver a cargar la lista para que el libro desaparezca de la pantalla
        this.cargarLibros();
      },
      error: (err) => {
        console.error('Error al intentar borrar el libro:', err);
        // Si hay error, puedes mostrar un mensaje feo de error aquí.
      }
    });
  }
}
