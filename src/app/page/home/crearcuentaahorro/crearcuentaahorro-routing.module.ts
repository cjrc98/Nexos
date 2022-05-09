import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CrearcuentaahorroPage } from './crearcuentaahorro.page';

const routes: Routes = [
  {
    path: '',
    component: CrearcuentaahorroPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CrearcuentaahorroPageRoutingModule {}
