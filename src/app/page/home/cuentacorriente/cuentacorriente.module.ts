import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CuentacorrientePageRoutingModule } from './cuentacorriente-routing.module';

import { CuentacorrientePage } from './cuentacorriente.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CuentacorrientePageRoutingModule
  ],
  declarations: [CuentacorrientePage]
})
export class CuentacorrientePageModule {}
