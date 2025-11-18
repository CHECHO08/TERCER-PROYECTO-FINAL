import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { BibliotecaService } from '../../services/biblioteca.service';
import { Libro } from '../../models/libro.model';
import { switchMap } from 'rxjs/operators';
import { of } from 'rxjs';

@Component({
  selector: 'app-editar-libro',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterLink],
  template: `
    <div class="min-h-screen bg-gray-100 p-6 font-sans flex justify-center items-start">
      <div class="p-8 w-full max-w-lg bg-white shadow-2xl rounded-xl mt-10 border-t-4 border-teal-500">

        <h2 class="text-3xl font-bold text-teal-700 mb-6 border-b pb-3">
          ✏️ Editar Libro
        </h2>

        <!-- Formulario -->
        @if (libroForm) {
          <form [formGroup]="libroForm" (ngSubmit)="actualizarLibro()">

            <!-- tituloo -->
            <div class="mb-4">
              <label for="titulo" class="block text-sm font-medium text-gray-700">Título</label>
              <input id="titulo" type="text" formControlName="titulo"
                    class="mt-1 block w-full border border-gray-300 rounded-lg shadow-sm p-3 focus:ring-teal-500 focus:border-teal-500">
              @if (libroForm.get('titulo')?.invalid && libroForm.get('titulo')?.touched) {
                <p class="text-red-500 text-xs mt-1">El título es obligatorio.</p>
              }
            </div>

            <!-- autor -->
            <div class="mb-4">
              <label for="autor" class="block text-sm font-medium text-gray-700">Autor</label>
              <input id="autor" type="text" formControlName="autor"
                    class="mt-1 block w-full border border-gray-300 rounded-lg shadow-sm p-3 focus:ring-teal-500 focus:border-teal-500">
              @if (libroForm.get('autor')?.invalid && libroForm.get('autor')?.touched) {
                <p class="text-red-500 text-xs mt-1">El autor es obligatorio.</p>
              }
            </div>

            <!-- Año -->
            <div class="mb-6">
              <label for="anio" class="block text-sm font-medium text-gray-700">Año de Publicación</label>
              <input id="anio" type="number" formControlName="anio"
                    class="mt-1 block w-full border border-gray-300 rounded-lg shadow-sm p-3 focus:ring-teal-500 focus:border-teal-500">
              @if (libroForm.get('anio')?.invalid && libroForm.get('anio')?.touched) {
                <p class="text-red-500 text-xs mt-1">El año debe ser un número válido.</p>
              }
            </div>

            <!-- Botom de Enviar y Volver -->
            <div class="flex justify-between items-center">
              <button type="submit" [disabled]="libroForm.invalid"
                      class="px-6 py-3 bg-teal-600 text-white font-semibold rounded-lg shadow-md transition duration-150 transform hover:scale-105"
                      [class.opacity-50]="libroForm.invalid" [class.hover:bg-teal-700]="!libroForm.invalid">
                💾 Guardar Cambios
              </button>
              <a [routerLink]="['/lista']" class="text-indigo-600 hover:text-indigo-800 transition duration-150 font-medium">
                ← Volver a la Lista
              </a>
            </div>
          </form>
        } @else if (isLoading) {
          <p class="text-center text-gray-500">Cargando datos del libro para editar...</p>
        } @else {
          <div class="text-center p-4 bg-red-100 border-l-4 border-red-500 text-red-700 rounded-lg">
            <p class="font-semibold">¡No se pudo cargar el libro! ¿El ID es correcto?</p>
          </div>
        }

        <!-- Mensajes de Alerta -->
        @if (successMessage) {
          <div class="mt-6 p-4 bg-green-100 text-green-700 rounded-lg font-medium border border-green-300">{{ successMessage }}</div>
        }
        @if (errorMessage) {
          <div class="mt-6 p-4 bg-red-100 text-red-700 rounded-lg font-medium border border-red-300">Error: {{ errorMessage }}</div>
        }
      </div>
    </div>
  `,
  styles: []
})
export class EditarLibroComponent implements OnInit {
  private fb = inject(FormBuilder);
  private bibliotecaService = inject(BibliotecaService);
  private route = inject(ActivatedRoute);
  private router = inject(Router);

  libroForm!: FormGroup;
  libroId: string | null = null;
  isLoading: boolean = true;
  successMessage: string | null = null;
  errorMessage: string | null = null;

  ngOnInit(): void {
    // 1. Inicializamos el formulario vacío
    this.libroForm = this.fb.group({
      titulo: ['', Validators.required],
      autor: ['', Validators.required],
      anio: [null, [Validators.required, Validators.min(1000), Validators.max(new Date().getFullYear())]]
    });

    // 2. Cargamos el libro basado en el ID de la URL
    this.route.params.pipe(
      switchMap(params => {
        this.libroId = params['id'];
        this.isLoading = true;

        if (this.libroId) {
          // Si hay ID, pide los datos del libro al servicio
          return this.bibliotecaService.obtenerLibroPorId(this.libroId);
        } else {
          // Si no hay id no carga datos
          this.isLoading = false;
          return of(undefined);
        }
      })
    ).subscribe({
      next: (libro) => {
        this.isLoading = false;
        if (libro) {
          // 3.cargar datos
          this.libroForm.patchValue(libro);
        } else {
          this.errorMessage = 'Libro no encontrado o ID no válido.';
        }
      },
      error: (err) => {
        this.isLoading = false;
        console.error('Error al cargar datos para edición:', err);
        this.errorMessage = 'No se pudo conectar para obtener los datos. ¿Está el backend encendido?';
      }
    });
  }

  actualizarLibro() {
    this.successMessage = null;
    this.errorMessage = null;

    if (this.libroForm.invalid || !this.libroId) {
      this.errorMessage = 'Faltan datos en el formulario o el ID del libro se perdió.';
      return;
    }

    const libroActualizado: Libro = { ...this.libroForm.value, id: this.libroId };

    this.bibliotecaService.actualizarLibro(this.libroId, libroActualizado).subscribe({
      next: () => {
        this.successMessage = `¡Súper! Los cambios de "${libroActualizado.titulo}" se guardaron.`;
        setTimeout(() => {
          this.router.navigate(['/lista']);
        }, 1000);
      },
      error: (err) => {
        console.error('Error al actualizar el libro:', err);
        this.errorMessage = 'Hubo un error al guardar los cambios en el servidor.';
      }
    });
  }
}
