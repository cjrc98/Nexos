import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HomePage } from './home.page';

const routes: Routes = [
  {
    path: '',
    component: HomePage
  },
  {
    path: 'qrscanner',
    loadChildren: () => import('./qrscanner/qrscanner.module').then( m => m.QrscannerPageModule)
  },
  {
    path: 'transferencia',
    loadChildren: () => import('./transferencia/transferencia.module').then( m => m.TransferenciaPageModule)
  },
  {
    path: 'cuentacorriente',
    loadChildren: () => import('./cuentacorriente/cuentacorriente.module').then( m => m.CuentacorrientePageModule)
  },
  {
    path: 'cuentahorro',
    loadChildren: () => import('./cuentahorro/cuentahorro.module').then( m => m.CuentahorroPageModule)
  },
  {
    path: 'crearcuenta',
    loadChildren: () => import('./crearcuenta/crearcuenta.module').then( m => m.CrearcuentaPageModule)
  },
  {
    path: 'crearcuentaahorro',
    loadChildren: () => import('./crearcuentaahorro/crearcuentaahorro.module').then( m => m.CrearcuentaahorroPageModule)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class HomePageRoutingModule {}
