import { LOCALE_ID, NgModule } from '@angular/core';
import { CommonModule, registerLocaleData } from '@angular/common';
import { RouteReuseStrategy } from '@angular/router';
import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { LocaleService } from './services/localeService';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { createTranslateLoader } from './utils/translate';
import en from '@angular/common/locales/en';
import es from '@angular/common/locales/es';
import { UserComponent } from './components';
import { DateTimeSelectableComponent } from './components/datetimeselectable/datetimeselectable.component';

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
    ReactiveFormsModule
  ],
  exports:[
    CommonModule,
    FormsModule,
    IonicModule,
    ReactiveFormsModule,
    HttpClientModule
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

