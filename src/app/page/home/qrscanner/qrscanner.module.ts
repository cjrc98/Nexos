import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { QrscannerPageRoutingModule } from './qrscanner-routing.module';

import { QrscannerPage } from './qrscanner.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    QrscannerPageRoutingModule,
    ReactiveFormsModule
  ],
  declarations: [QrscannerPage]
})
export class QrscannerPageModule {}
