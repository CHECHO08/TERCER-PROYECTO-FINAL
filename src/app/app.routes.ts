import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'lista',
    pathMatch: 'full'
  },
//ruta lisrta
  {
    path: 'lista',
    loadComponent: () => import('./components/lista/lista.component').then(m => m.ListaComponent)
  },
//ruta crear
  {
    path: 'crear-libro',
    loadComponent: () => import('./components/crear-libro/crear-libro.component').then(m => m.CrearLibroComponent)
  },
//editar ruta
  {
    path: 'editar-libro/:id', // IMPORTANTE: Necesita el ID del libro
    loadComponent: () => import('./components/editar-libro/editar-libro.component').then(m => m.EditarLibroComponent)
  },

  // detalle libro
  {
    path: 'libro/:id', // También necesita el ID del libro
    loadComponent: () => import('./components/libro/libro.component').then(m => m.LibroComponent)
  },
];
