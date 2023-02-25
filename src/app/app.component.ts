import { ChangeDetectorRef, Component } from '@angular/core';
import { Router } from '@angular/router';
import { ToastController } from '@ionic/angular';
import { TranslateService } from '@ngx-translate/core';
import { FollowService, LocaleService, User } from './core';
import { UserService } from './core/services/user.service';
@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  public appPages = [
    { title: 'home', url: '/folder/home', icon: 'home' },
    { title: 'profile', url: '/folder/profile', icon: 'person-circle' },
    { title: 'bosses', url: '/folder/bosses', icon: 'bonfire' },
    { title: 'social', url: '/folder/social', icon: 'people' },
    { title: 'about', url: '/folder/about', icon: 'information-circle' }
  ];

  constructor(
    public user:UserService,
    private translate: TranslateService,
    private localeService:LocaleService,
    private userData: UserService,
    private followData: FollowService,
    private cdr:ChangeDetectorRef,
    private router:Router
  ) {
    this.translate.setDefaultLang('es');
  }

  
  language = 0

  onLanguage() {
    this.language = (this.language+1)%2

    switch(this.language) {
      case 0:
        this.translate.setDefaultLang('es');
        this.localeService.registerCulture('es');
        break;
      case 1:
        this.translate.setDefaultLang('en');
        this.localeService.registerCulture('en-uk');
        break;
    }
    this.cdr.detectChanges();
  }

  isNotFollowPage() {
    return this.followData.followPage = false;
  }

  logOut() {
    this.user.signOut();
    this.router.navigate(['login']);
  }

  getUserActive():User|undefined {
    return this.userData.currentUser as unknown as User;
  }
}
