import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { HomePageRoutingModule } from './home-routing.module';

import { HomePage } from './home.page';
import { QrscannerPageModule } from './qrscanner/qrscanner.module';
import { QrscannerPage } from './qrscanner/qrscanner.page';
import { TransferenciaPageModule } from './transferencia/transferencia.module';
import { CuentahorroPageModule } from './cuentahorro/cuentahorro.module';
import { CuentacorrientePageModule } from './cuentacorriente/cuentacorriente.module';




@NgModule({
  entryComponents: [
    QrscannerPage,
    TransferenciaPageModule,
    CuentahorroPageModule,
    CuentacorrientePageModule
  ],
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    HomePageRoutingModule,
    ReactiveFormsModule,
    QrscannerPageModule,
    TransferenciaPageModule,
    CuentahorroPageModule,
    CuentacorrientePageModule
  ],
  declarations: [HomePage]
})
export class HomePageModule {}
