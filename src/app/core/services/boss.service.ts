import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { BehaviorSubject } from "rxjs";
import { Boss } from "../models/boss.model";

@Injectable({
  providedIn: 'root'
})
export class BossService {

  private _bossList: Boss[] = [
    {
      id: 1,
      name: 'Margit, the Fell Omen',
      area: 'Limgrave',
      location: 'StormVeil Castle',
      description: 'A lowly tarnished, in search of the Elden Ring, involvened by the flame of ambition, someone must extinguish thy flame',
      lifePoints: 8000,
      image: 'a'
    },
  
  ]

  private _boss:BehaviorSubject<Boss[]> = new BehaviorSubject(this._bossList);
  public boss$ = this._boss.asObservable();

  id:number = this._bossList.length+1;
  constructor(
    private router:Router
  ) { 
  }

  getBoss(){
    return this._bossList;
  }

  addBoss(boss:Boss){
    boss.id = this.id++;
    this._bossList.push(boss);
    this._boss.next(this._bossList);
  }


}
