import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CuentacorrientePage } from './cuentacorriente.page';

const routes: Routes = [
  {
    path: '',
    component: CuentacorrientePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CuentacorrientePageRoutingModule {}
