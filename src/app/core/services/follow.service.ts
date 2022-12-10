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
      idUser: 1,
      idFollowed: 2
    },
    {
      idUser: 1,
      idFollowed: 3
    },
  ]

  private _follow:BehaviorSubject<Follow[]> = new BehaviorSubject(this._followsList);
  public follow$ = this._follow.asObservable();

  
  constructor(
    
  ) { 
  }

  getFollowList(){
    return this._followsList;
  }

  follow(follow:Follow){
    this._followsList.push(follow);
    this._follow.next(this._followsList);
  }

  unfollowById(id:number){
    this._followsList = this._followsList.filter(f=>f.idFollowed != id); 
    this._follow.next(this._followsList);
  }
}
