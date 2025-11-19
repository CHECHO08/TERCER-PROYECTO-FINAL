import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { BibliotecaService } from '../../services/biblioteca.service';
import { Libro } from '../../models/libro.model';

@Component({
  selector: 'app-crear-libro',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterLink],
  template: `
    <div class="min-h-screen bg-gray-100 p-6 font-sans flex justify-center items-start">
      <div class="p-8 w-full max-w-lg bg-white shadow-2xl rounded-xl mt-10 border-t-4 border-green-500">

        <h2 class="text-3xl font-bold text-green-700 mb-6 border-b pb-3">
          ➕ Agregar Libro Nuevo
        </h2>

        <!-- Formulario -->
        <form [formGroup]="libroForm" (ngSubmit)="agregarLibro()">

          <!-- Campo Título -->
          <div class="mb-4">
            <label for="titulo" class="block text-sm font-medium text-gray-700">Título</label>
            <input id="titulo" type="text" formControlName="titulo"
                   class="mt-1 block w-full border border-gray-300 rounded-lg shadow-sm p-3 focus:ring-green-500 focus:border-green-500">
            @if (libroForm.get('titulo')?.invalid && libroForm.get('titulo')?.touched) {
              <p class="text-red-500 text-xs mt-1">El título es obligatorio.</p>
            }
          </div>

          <!-- Campo Autor -->
          <div class="mb-4">
            <label for="autor" class="block text-sm font-medium text-gray-700">Autor</label>
            <input id="autor" type="text" formControlName="autor"
                   class="mt-1 block w-full border border-gray-300 rounded-lg shadow-sm p-3 focus:ring-green-500 focus:border-green-500">
            @if (libroForm.get('autor')?.invalid && libroForm.get('autor')?.touched) {
              <p class="text-red-500 text-xs mt-1">El autor es obligatorio.</p>
            }
          </div>

          <!-- Campo Año -->
          <div class="mb-6">
            <label for="anio" class="block text-sm font-medium text-gray-700">Año de Publicación</label>
            <input id="anio" type="number" formControlName="anio"
                   class="mt-1 block w-full border border-gray-300 rounded-lg shadow-sm p-3 focus:ring-green-500 focus:border-green-500">
            @if (libroForm.get('anio')?.invalid && libroForm.get('anio')?.touched) {
              <p class="text-red-500 text-xs mt-1">El año debe ser un número válido.</p>
            }
          </div>

          <!-- Botón de Enviar y Volver -->
          <div class="flex justify-between items-center">
            <button type="submit" [disabled]="libroForm.invalid"
                    class="px-6 py-3 bg-green-600 text-white font-semibold rounded-lg shadow-md transition duration-150 transform hover:scale-105"
                    [class.opacity-50]="libroForm.invalid" [class.hover:bg-green-700]="!libroForm.invalid">
              Guardar Libro
            </button>
            <a [routerLink]="['/lista']" class="text-indigo-600 hover:text-indigo-800 transition duration-150 font-medium">
              ← Volver a la Lista
            </a>
          </div>
        </form>

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
export class CrearLibroComponent implements OnInit {
  private fb = inject(FormBuilder);
  private bibliotecaService = inject(BibliotecaService);
  private router = inject(Router);

  libroForm!: FormGroup;
  successMessage: string | null = null;
  errorMessage: string | null = null;

  ngOnInit(): void {
    this.libroForm = this.fb.group({
      titulo: ['', Validators.required],
      autor: ['', Validators.required],
      anio: [null, [Validators.required, Validators.min(1000), Validators.max(new Date().getFullYear())]]
    });
  }

  agregarLibro() {
    this.successMessage = null;
    this.errorMessage = null;

    if (this.libroForm.invalid) {
      // error formulario
      return;
    }

    const nuevoLibro: Libro = this.libroForm.value as Libro;

    this.bibliotecaService.crearLibro(nuevoLibro).subscribe({
      next: (libroGuardado: Libro) => {
        this.successMessage = `¡Genial! El libro "${libroGuardado.titulo}" se guardó con éxito.`;
        // Navega a la lista 
        setTimeout(() => {
          this.router.navigate(['/lista']);
        }, 1500);
      },
      error: (err: any) => {
        console.error('Error al guardar el libro:', err);
        this.errorMessage = 'Hubo un problema al conectar con el servidor. ¿El Backend está encendido?';
      }
    });
  }
}
