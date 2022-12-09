import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ProfilePageRoutingModule } from './profile-routing.module';

import { ProfilePage } from './profile.page';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { createTranslateLoader } from 'src/app/core';
import { ProfileComponent } from 'src/app/core/components/profile/profile.component';
import { CompletedBossComponent } from 'src/app/core/components/completed-boss/completed-boss.component';
import { CompletedBossFormComponent } from 'src/app/core/components/completed-boss-form/completed-boss-form.component';

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    IonicModule,
    ProfilePageRoutingModule,
    HttpClientModule,
    TranslateModule.forChild({
      loader: {
      provide: TranslateLoader,
      useFactory: (createTranslateLoader),
      deps: [HttpClient]
      }
      }),
  ],
  declarations: [ProfilePage, ProfileComponent, CompletedBossComponent, CompletedBossFormComponent]
})
export class ProfilePageModule {}
