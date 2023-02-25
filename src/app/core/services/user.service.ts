import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { DocumentData } from '@firebase/firestore';
import { ToastController } from '@ionic/angular';
import { TranslateService } from '@ngx-translate/core';
import { BehaviorSubject, lastValueFrom } from 'rxjs';
import { User, UserLogin, UserRegister } from '../models/user.model';
import { BossService } from './boss.service';
import { CompletedBossService } from './completed-boss.service';
import { FirebaseService } from './firebase/firebase-service';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private _userList: User[] = [];

  private _userLogged:BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  public userLogged$ = this._userLogged.asObservable();

  private _user:BehaviorSubject<User> = new BehaviorSubject(null);
  public user$ = this._user.asObservable();

  private _userSubject:BehaviorSubject<User[]> = new BehaviorSubject([]);
  public _user$ = this._userSubject.asObservable();

  public currentUser: User;

  unsubscr;
  constructor(
    private firebase:FirebaseService,
    private router:Router,
    private bossData: BossService,
    private completedbData: CompletedBossService,
    private toastController: ToastController,
    private translate: TranslateService
  ) {
    this.init();
    this.unsubscr = this.firebase.subscribeToCollection('usuarios',this._userSubject, this.mapUser);
  }

  gOnDestroy(): void {
    this.unsubscr();
  }

  private mapUser(doc:DocumentData){
    return {
      id:0,
      docId:doc['id'],
      admin: doc['data']().admin,
      name: doc['data']().name,
      surname: doc['data']().surname,
      birthdate: doc['data']().birthdate,
      email: doc['data']().email,
      username: doc['data']().username,
      password: doc['data']().password,
      profilePick: doc['data']().profilePick
    };
  }

  private async init(){
    this.firebase.isLogged$.subscribe(async (logged)=>{
      if(logged){
        this._user.next((await this.firebase.getDocument('usuarios', this.firebase.getUser().uid)).data as User);
        this.router.navigate(['folder/home']);
      }
      this._userLogged.next(logged);
    });
    
  }

  public login(credentials:UserLogin):Promise<string>{
    return new Promise<string>(async (resolve, reject)=>{
      if(!this._userLogged.value){
        try {
          await this.firebase.connectUserWithEmailAndPassword(credentials.username, credentials.password);
          this.presentToastLoggedUser();
          this.currentUser = await this.getUserByIdd(this.firebase.getUser().uid);
        } catch (error) {
          reject(error);
        }
      }
      else{
        reject('already connected');
      }
    });
    
  }

  signOut(){
    this.firebase.signOut();
    this.router.navigate(['login']);
  }
  
  public async register(data: UserRegister){
    try {
      if (!this._userLogged.value) {
        const user = await this.firebase.createUserWithEmailAndPassword(data.email, data.password);
        const userData = {
          uid: user.user.uid,
          admin: false,
          username: data.username, 
          profilePick: data.profilePick,
          email: data.email,
          provider: "firebase",
          token: await user.user.getIdToken(),
          name: data.name,
          surname: data.surname,
          birthdate: data.birthdate,
          
        };
        await this.firebase.createDocumentWithId('usuarios', userData, user.user.uid);
        await this.firebase.connectUserWithEmailAndPassword(data.email, data.password);
      } else {
        throw new Error('Already connected');
      } 
    } catch (error) {
      console.log(error);
      throw error;
    }
  }

  getUserList(){
    return this._userSubject.value;
  }

  getUserByIdd(id:string):Promise<User>{
    return new Promise<User>(async (resolve, reject)=>{
      try {
        var user = (await this.firebase.getDocument('usuarios', id));
        resolve({
          id:0,
          docId: user.id,
          admin: user.data['admin'],
          name:user.data['name'],
          surname: user.data['surname'],
          birthdate: user.data['birthdate'],
          email: user.data['email'],
          username: user.data['username'],
          password: user.data['password'],
          profilePick: user.data['profilePick'] 
        });  
      } catch (error) {
        reject(error);
      }
    });
  }

  getUserById(id: number):User {
    return this._userList.find(u=>u.id==id);
  }

  

  addUser(user:User) {
    this._userList.push(user);
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
    
    
  }

  deleteUserById(id:number) {
    this._userList = this._userList.filter(u=>u.id != id); 
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
      message: await lastValueFrom(this.translate.get('toasts.logged')),
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
