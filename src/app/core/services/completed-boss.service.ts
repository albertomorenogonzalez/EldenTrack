import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { CompletedBoss } from '../models/completed-boss.model';
import { UserService } from './user.service';

@Injectable({
  providedIn: 'root'
})
export class CompletedBossService {

  private _completedBossesList: CompletedBoss[] = [
    {
      id: 1,
      idBoss: 1,
      idUser: 1,
      startDate: '2022-12-08',
      finishDate: '2022-12-09',
      notes: 'no'
    },
    {
      id: 2,
      idBoss: 2,
      idUser: 1,
      startDate: '2022-12-08',
      finishDate: '2022-12-09',
      notes: 'no'
    }
  ]

  private _completedBoss:BehaviorSubject<CompletedBoss[]> = new BehaviorSubject(this._completedBossesList);
  public completedBoss$ = this._completedBoss.asObservable();

  id:number = this._completedBossesList.length+1;
  constructor(
  ) { 
  }

  getCompletedBosses() {
    return this._completedBossesList;
  }

  getCompletedBossById(id: number) {
    return this._completedBossesList.find(c=>c.id==id);
  }

  getCompletedBossesByUserId(idUser: number) {
    return this._completedBossesList.filter(c=>c.idUser == idUser)
  }

  getBossCompletedByBossId(idBoss: number, idUser?: number) {
    return this._completedBossesList.find(c=>c.idBoss==idBoss && c.idUser==idUser)
  }

  addCompletedBoss(completedBoss:CompletedBoss) {
    completedBoss.id = this.id++;
    this._completedBossesList.push(completedBoss);
    this._completedBoss.next(this._completedBossesList);
  }

  updateCompletedBoss(completedBoss:CompletedBoss) {
    var _completedBoss = this._completedBossesList.find(c=>c.id==completedBoss.id);
    if(_completedBoss){
      _completedBoss.idBoss = completedBoss.idBoss;
      _completedBoss.idUser = completedBoss.idUser;
      _completedBoss.startDate = completedBoss.startDate;
      _completedBoss.finishDate = completedBoss.finishDate;
      _completedBoss.notes = completedBoss.notes;
    }
    
    this._completedBoss.next(this._completedBossesList);
  }

  deleteCompletedBossById(id:number) {
    this._completedBossesList = this._completedBossesList.filter(c=>c.id != id); 
    this._completedBoss.next(this._completedBossesList);
  }
}
