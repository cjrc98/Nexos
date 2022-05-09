import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CuentahorroPage } from './cuentahorro.page';

const routes: Routes = [
  {
    path: '',
    component: CuentahorroPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CuentahorroPageRoutingModule {}
