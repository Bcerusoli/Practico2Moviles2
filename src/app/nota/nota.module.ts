import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { NotaPageRoutingModule } from './nota-routing.module';

import { NotaPage } from './nota.page';
import { ColorChromeModule } from 'ngx-color/chrome';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    NotaPageRoutingModule,
    ColorChromeModule
  ],
  declarations: [NotaPage]
})
export class NotaPageModule {}