import { Component, OnInit, inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { BibliotecaService } from '../../services/biblioteca.service';
import { Libro } from '../../models/libro.model';
import { switchMap } from 'rxjs/operators';

@Component({
  selector: 'app-libro',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="p-6 max-w-2xl mx-auto bg-white shadow-xl rounded-lg mt-8">
      @if (libro) {
        <h1 class="text-4xl font-bold text-indigo-800 mb-4">{{ libro.titulo }}</h1>
        <p class="text-xl text-gray-600 border-b pb-3 mb-4">Por: <span class="font-semibold">{{ libro.autor }}</span></p>

        <div class="space-y-3">
          <p class="text-lg"><strong>ID:</strong> {{ libro.id }}</p>
          <p class="text-lg"><strong>Año de Publicación:</strong> {{ libro.anio }}</p>
        </div>

        <button (click)="goToBack()"
                class="mt-6 px-4 py-2 bg-indigo-600 text-white font-semibold rounded-lg shadow-md hover:bg-indigo-700 transition duration-150">
          ← Volver a la Lista
        </button>

      } @else if (isLoading) {
        <p class="text-center text-gray-500">Cargando detalles del libro...</p>
      } @else {
        <div class="text-center p-4 bg-red-100 border-l-4 border-red-500 text-red-700 rounded-lg">
          <p class="font-semibold">Libro no encontrado.</p>
        </div>
      }
    </div>
  `,
  styles: []
})
export class LibroComponent implements OnInit {
  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private bibliotecaService = inject(BibliotecaService);

  libro: Libro | undefined;
  isLoading: boolean = true;

  ngOnInit(): void {

    this.route.params.pipe(
      switchMap(params => {

        const id = params['id'] as string;
        if (!id) {
          this.isLoading = false;
          return [undefined];
        }

        return this.bibliotecaService.obtenerLibroPorId(id);
      })
    ).subscribe({
      next: (libro) => {
        this.libro = libro;
        this.isLoading = false;
      },
      error: () => {
        this.isLoading = false;
        this.libro = undefined;
      }
    });
  }

  goToBack() {
    this.router.navigate(['/lista']);
  }
}
