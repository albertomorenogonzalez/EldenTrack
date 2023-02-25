import { LOCALE_ID, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { LocaleService } from './core/services/locale.service';
import { createTranslateLoader } from './core/utils/translate';
import { CoreModule, LocaleId } from './core/core.module';
import { FirebaseService, FirebaseWebService } from './core';


@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule, IonicModule.forRoot(), AppRoutingModule, 
    CoreModule,
    HttpClientModule,
    TranslateModule.forRoot({
      loader: {
      provide: TranslateLoader,
      useFactory: (createTranslateLoader),
      deps: [HttpClient]
      }
      })],
  providers: [
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
    {
      provide: LOCALE_ID,
      deps: [LocaleService],
      useClass: LocaleId
    },
    {
      provide:FirebaseService,
      deps:[],
      useFactory:()=>new FirebaseWebService()
    }
 
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
