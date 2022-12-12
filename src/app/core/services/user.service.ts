import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { User } from '../models/user.model';

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
      profilePick: 'http://drive.google.com/uc?export=view&id=1xM39mOtZFzHe1LkSBoCXTsJMPVWo8s-m'
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

  public currentUser:User|undefined=undefined;

  id:number = this._userList.length+1;
  constructor(
    private router:Router
  ) { 
  }

  getUserList() {
    return this._userList;
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

    if (userLogin?.password==user.password) {
      this.currentUser = userLogin;
      this.login()
    } else {
      console.log("Usuario no encontrado")
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
}
