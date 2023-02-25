import { LOCALE_ID, NgModule } from '@angular/core';
import { CommonModule, registerLocaleData } from '@angular/common';
import { RouteReuseStrategy } from '@angular/router';
import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { LocaleService } from './services/locale.service';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { createTranslateLoader } from './utils/translate';
import en from '@angular/common/locales/en';
import es from '@angular/common/locales/es';
import { BossComponent, FollowFormComponent, RegisterFormComponent, UserCompletedBossesComponent, UserComponent } from './components';
import { ProfileComponent } from './components/profile/profile.component';
import { CompletedBossFormComponent } from './components/completed-boss-form/completed-boss-form.component';
import { CompletedBossComponent } from './components/completed-boss/completed-boss.component';
import { DateTimeSelectableComponent } from './components/date-time-selectable/date-time-selectable.component';
import { BossFormComponent } from './components/boss-form/boss-form.component';
import { IonicStorageModule } from '@ionic/storage-angular';
import { Drivers } from '@ionic/storage';
import { Camera } from '@awesome-cordova-plugins/camera/ngx';
import { File } from '@awesome-cordova-plugins/file/ngx';

export class LocaleId extends String{
  constructor(private locale:LocaleService){
    super()

  }
  override toString(): string {
    return this.locale.locale;
  }

  override valueOf(): string {
    return this.toString();
  }
}

registerLocaleData(es)
registerLocaleData(en)

@NgModule({
  declarations: [
    UserComponent,
    RegisterFormComponent,
    ProfileComponent,
    BossComponent,
    BossFormComponent,
    CompletedBossComponent,
    CompletedBossFormComponent,
    DateTimeSelectableComponent,
    UserCompletedBossesComponent,
    FollowFormComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    IonicModule.forRoot(),
    HttpClientModule,
    TranslateModule.forChild({
      loader: {
      provide: TranslateLoader,
      useFactory: (createTranslateLoader),
      deps: [HttpClient]
      }
      }),
    IonicStorageModule.forRoot({
      name: '__tareandodb',
          driverOrder: [Drivers.IndexedDB, Drivers.LocalStorage]
    }),
    ReactiveFormsModule
  ],
  exports:[
    CommonModule,
    FormsModule,
    IonicModule,
    ReactiveFormsModule,
    HttpClientModule,
    UserComponent,
    RegisterFormComponent,
    ProfileComponent,
    BossComponent,
    BossFormComponent,
    CompletedBossComponent,
    CompletedBossFormComponent,
    DateTimeSelectableComponent,
    UserCompletedBossesComponent,
    FollowFormComponent
  ],

  providers: [
  { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
  {
    provide: LOCALE_ID,
    deps: [LocaleService],
    useClass: LocaleId
  },
 
  ]
})
export class CoreModule { }

