import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { FollowedUsersPageRoutingModule } from './followed-users-routing.module';

import { FollowedUsersPage } from './followed-users.page';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { createTranslateLoader } from 'src/app/core';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    FollowedUsersPageRoutingModule,
    HttpClientModule,
    TranslateModule.forChild({
      loader: {
      provide: TranslateLoader,
      useFactory: (createTranslateLoader),
      deps: [HttpClient]
      }
      }),
  ],
  declarations: [FollowedUsersPage]
})
export class FollowedUsersPageModule {}
