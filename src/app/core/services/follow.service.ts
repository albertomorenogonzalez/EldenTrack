import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Follow } from '../models/follow.model';
import { UserService } from './user.service';

@Injectable({
  providedIn: 'root'
})
export class FollowService {

  private _followsList: Follow[] = [
    {
      id: 1,
      idUser: 1,
      idFollowed: 2
    },
    {
      id: 2,
      idUser: 1,
      idFollowed: 3
    },
    {
      id: 3,
      idUser: 1,
      idFollowed: 4
    },
    {
      id: 4,
      idUser: 1,
      idFollowed: 5
    },
    {
      id: 5,
      idUser: 1,
      idFollowed: 6
    },
    {
      id: 6,
      idUser: 2,
      idFollowed: 1
    },
    {
      id: 7,
      idUser: 2,
      idFollowed: 3
    },
    {
      id: 8,
      idUser: 3,
      idFollowed: 1
    },
    {
      id: 9,
      idUser: 3,
      idFollowed: 2
    },
    {
      id: 10,
      idUser: 4,
      idFollowed: 1
    },
    {
      id: 11,
      idUser: 4,
      idFollowed: 6
    },
    {
      id: 12,
      idUser: 5,
      idFollowed: 1
    },
    {
      id: 13,
      idUser: 5,
      idFollowed: 6
    },
    {
      id: 14,
      idUser: 6,
      idFollowed: 4
    },
    {
      id: 15,
      idUser: 6,
      idFollowed: 5
    },
  ]

  private _follow:BehaviorSubject<Follow[]> = new BehaviorSubject(this._followsList);
  public follow$ = this._follow.asObservable();

  id:number = this._followsList.length+1;
  constructor(
  ) { }

  public idUser: number | undefined;
  public idFollowed!: number;
  public followPage: Boolean = false;

  getFollowList() {
    return this._followsList;
  }

  getFollowsByUserId(idUser?: number) {
    return this._followsList.find(f=>f.idUser == idUser)
  }

  getFollowById(id: number) {
    return this._followsList.find(u=>u.id==id);
  }

  getFollowByIdFollowed(idFollowed?: number, idUser?: number) {
    return this._followsList.find(f=>f.idFollowed==idFollowed && f.idUser==idUser)
  }

  follow(follow:Follow) {
    follow.id = this.id++;
    this._followsList.push(follow);
    this._follow.next(this._followsList);
  }

  unfollowById(id?:number) {
    this._followsList = this._followsList.filter(f=>f.idFollowed != id); 
    this._follow.next(this._followsList);
  }

  getFollowedUsers(idUser?: number) {
    return this._followsList.filter(follow=>follow.idUser == idUser)
  }
  
}
