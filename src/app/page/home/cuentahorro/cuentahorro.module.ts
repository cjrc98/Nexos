import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CuentahorroPageRoutingModule } from './cuentahorro-routing.module';

import { CuentahorroPage } from './cuentahorro.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CuentahorroPageRoutingModule
  ],
  declarations: [CuentahorroPage]
})
export class CuentahorroPageModule {}
