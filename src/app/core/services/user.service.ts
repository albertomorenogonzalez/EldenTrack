import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { ToastController } from '@ionic/angular';
import { TranslateService } from '@ngx-translate/core';
import { BehaviorSubject, lastValueFrom } from 'rxjs';
import { User } from '../models/user.model';
import { BossService } from './boss.service';
import { CompletedBossService } from './completed-boss.service';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  
  private _userList: User[] = [
    {
      id: 1,
      admin: true,
      name: 'Alberto',
      surname: 'Moreno González',
      birthdate: '2003-01-11',
      email: 'albertomorenogonzalez95@gmail.com',
      username: 'Gyobu Oniwa',
      password: 'Ashina3',
      profilePick: 'http://drive.google.com/uc?export=view&id=1Gbxra57Jf0kDzqMd9sK2ksXI9K-TUIRk'
    },
    {
      id: 2,
      admin: false,
      name: 'Juan Antonio',
      surname: 'Aranda Gálvez',
      birthdate: '2001-06-13',
      email: 'juananpro13@gmail.com',
      username: 'Galnio',
      password: 'PeepoClown',
      profilePick: 'http://drive.google.com/uc?export=view&id=1tqvd0kdOyuAEm4PdU_97-lay83DUBZt1'
    },
    {
      id: 3,
      admin: false,
      name: 'Adiel',
      surname: 'Roca Flores',
      birthdate: '2002-10-13',
      email: 'adifirel13@gmail.com',
      username: 'Yametekudasaioni',
      password: 'MarDeBolivia',
      profilePick: 'http://drive.google.com/uc?export=view&id=1DcTaP7omPSv57wSvSKt4IkzQkVN8EqoD'
    },
    {
      id: 4,
      admin: false,
      name: 'David',
      surname: 'Antúnez Pérez',
      birthdate: '2003-06-20',
      email: 'antunez49@gmail.com',
      username: 'An2',
      password: 'VideosDeValorant',
      profilePick: 'https://drive.google.com/uc?export=view&id=1a0BQyfhp2MhJpAWnRcjhH8iRFd0N4LcB'
    },
    {
      id: 5,
      admin: false,
      name: 'Alejandro',
      surname: 'Cueto Jiménez',
      birthdate: '2003-02-03',
      email: 'alecueto@gmail.com',
      username: 'Cueto',
      password: 'UnityIsLoveUnityIsLiveJueguitos',
      profilePick: 'https://drive.google.com/uc?export=view&id=194o1KqIAfAbWV8SZwNB2Cz2SsuPmx0dm'
    },
    {
      id: 6,
      admin: false,
      name: 'Sergio',
      surname: 'Morales ',
      birthdate: '2003-10-27',
      email: 'spidermantiktok@gmail.com',
      username: 'The amaising Mourals',
      password: 'spiderman',
      profilePick: 'https://drive.google.com/uc?export=view&id=1Qj02Tzvk4tD8GhIpHoHdE3zUmxY5yO_f'
    },
  ]

  private _userConnected:BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  public userConnected$ = this._userConnected.asObservable();

  private _user:BehaviorSubject<User[]> = new BehaviorSubject(this._userList);
  public user$ = this._user.asObservable();

  public currentUser: User | undefined

  id:number = this._userList.length+1;
  constructor(
    private router:Router,
    private bossData: BossService,
    private completedbData: CompletedBossService,
    private toastController: ToastController,
    private translate: TranslateService
  ) { 
  }

  getUserList() {
    return this._user;
  }

  getUserById(id: number) {
    return this._userList.find(u=>u.id==id);
  }

  addUser(user:User) {
    user.id = this.id++;
    this._userList.push(user);
    this._user.next(this._userList);
  }

  updateUser(user:User) {
    var _user = this._userList.find(u=>u.id==user.id);
    if(_user){
      _user.name = user.name;
      _user.surname = user.surname;
      _user.birthdate = user.birthdate;
      _user.email = user.email;
      _user.username = user.username;
      _user.password = user.password;
      _user.profilePick = user.profilePick
    }
    
    this._user.next(this._userList);
  }

  validateUser(user:User) {
    var userLogin = this._userList.find(u=>u.username==user.username)

    if (userLogin!=null) {
      if (userLogin?.password==user.password) {
        this.currentUser = userLogin;
        this.presentToastLoggedUser()
        this.login()
      } else {
        this.presentToastIncorrectUserOrPassword();
      }
    } else {
      this.presentToastIncorrectUserOrPassword();
    }
     
  }

  login() {
    this._userConnected.next(true);
  }

  disconnect() {
    this._userConnected.next(false);
    this.router.navigate(['folder/home']);
  }

  deleteUserById(id:number) {
    this._userList = this._userList.filter(u=>u.id != id); 
    this._user.next(this._userList);
  }

  numberOfBossesCompleted(user: User):number {
    return this.completedbData.getCompletedBossesByUserId(user.id).length
  }

  numberOfTotalBosses(): number {
    return this.bossData.getBossList().length
  }

  progress(user: User) {
    return this.numberOfBossesCompleted(user)/this.numberOfTotalBosses();
  }


  async presentToastLoggedUser() {
    const toast = await this.toastController.create({
      message: await lastValueFrom(this.translate.get('toasts.logged')) + this.currentUser?.username + '!',
      duration: 1500,
      position: 'top'
    });

    await toast.present();
  }

  async presentToastIncorrectUserOrPassword() {
    const toast = await this.toastController.create({
      message: await lastValueFrom(this.translate.get('toasts.incorrectUserOrPassword')),
      duration: 1500,
      position: 'top',
      color: 'danger'
    });

    await toast.present();
  }
}
