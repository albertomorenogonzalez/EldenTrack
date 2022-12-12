import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Boss } from '../models/boss.model';
import { Follow } from '../models/follow.model';

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
  ]

  private _follow:BehaviorSubject<Follow[]> = new BehaviorSubject(this._followsList);
  public follow$ = this._follow.asObservable();

  id:number = this._followsList.length+1;
  constructor(
    
  ) { 
  }

  getFollowList() {
    return this._followsList;
  }

  getFollowsByUserId(idUser: number) {
    return this._followsList.find(f=>f.idUser == idUser)
  }

  follow(follow:Follow) {
    follow.id = this.id++;
    this._followsList.push(follow);
    this._follow.next(this._followsList);
  }

  unfollowById(id:number) {
    this._followsList = this._followsList.filter(f=>f.idFollowed != id); 
    this._follow.next(this._followsList);
  }
}
