import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { BossesPageRoutingModule } from './bosses-routing.module';

import { BossesPage } from './bosses.page';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { createTranslateLoader } from 'src/app/core';
import { BossComponent } from 'src/app/core/components/boss/boss.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    BossesPageRoutingModule,
    HttpClientModule,
    TranslateModule.forChild({
      loader: {
      provide: TranslateLoader,
      useFactory: (createTranslateLoader),
      deps: [HttpClient]
      }
      }),
  ],
  declarations: [BossesPage, BossComponent]
})
export class BossesPageModule {}
