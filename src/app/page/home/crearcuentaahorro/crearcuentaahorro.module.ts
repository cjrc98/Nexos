import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CrearcuentaahorroPageRoutingModule } from './crearcuentaahorro-routing.module';

import { CrearcuentaahorroPage } from './crearcuentaahorro.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CrearcuentaahorroPageRoutingModule,
    ReactiveFormsModule
  ],
  declarations: [CrearcuentaahorroPage]
})
export class CrearcuentaahorroPageModule {}
