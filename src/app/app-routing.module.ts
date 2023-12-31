import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';


const routes: Routes = [
  
  {
    path: 'login',
    loadChildren: () => import('./login/login.module').then( m => m.LoginPageModule)
  },

  {
    path: 'registro',
    loadChildren: () => import('./Registro/registro/registro.module').then( m => m.RegistroPageModule)
  },
  {
    path: 'recuperar',
    loadChildren: () => import('./recuperar/recuperar.module').then( m => m.RecuperarPageModule)
  },
  {
    path: 'home-usuario',
    loadChildren: () => import('./home-usuario/home-usuario.module').then( m => m.HomeUsuarioPageModule)
  },
  
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  },
  {
    path: 'test',
    loadChildren: () => import('./test/test.module').then( m => m.TestPageModule)
  },
  {
    path: 'registro-auto',
    loadChildren: () => import('./registro-auto/registro-auto.module').then( m => m.RegistroAutoPageModule)
  },
  {
    path: 'registro-pasajero',
    loadChildren: () => import('./registro-pasajero/registro-pasajero.module').then( m => m.RegistroPasajeroPageModule)
  },
  {
    path: 'viajes',
    loadChildren: () => import('./viajes/viajes.module').then( m => m.ViajesPageModule)
  },
  {
    path: 'home-pasajero',
    loadChildren: () => import('./home-pasajero/home-pasajero.module').then( m => m.HomePasajeroPageModule)
  },
  {
    path: 'disponible',
    loadChildren: () => import('./disponible/disponible.module').then( m => m.DisponiblePageModule)
  },
  {
    path: 'test',
    loadChildren: () => import('./test/test.module').then(m => m.TestPageModule)
  },

  
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
