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
      image: 'http://drive.google.com/uc?export=view&id=1Ad_-TXFOA-4Xik_Wj6YZY62JNfZbxhVp'
    },
    {
      id: 2,
      name: 'Godrick, the Grafted',
      area: 'Limgrave',
      location: 'StormVeil Castle',
      description: 'A lowly tarnished, in search of the Elden Ring, involvened by the flame of ambition, someone must extinguish thy flame',
      lifePoints: 80000,
      image: 'http://drive.google.com/uc?export=view&id=1oWChqyygiekTcoDA6yxct-ZYnraNAPKe'
    },
    {
      id: 3,
      name: 'Rennala, Queen of the Full Moon',
      area: 'Liurnia of the Lakes',
      location: 'Academy of Raya Lucaria',
      description: 'A lowly tarnished, in search of the Elden Ring, involvened by the flame of ambition, someone must extinguish thy flame',
      lifePoints: 20000,
      image: 'http://drive.google.com/uc?export=view&id=1odnC4cM1_Or8Ro_Xi1jGzjLaSnSf_y8F'
    },
    {
      id: 4,
      name: 'Rykard, Lord of Blasphemy',
      area: 'Mount Gelmir',
      location: 'Volcano Manor',
      description: 'A lowly tarnished, in search of the Elden Ring, involvened by the flame of ambition, someone must extinguish thy flame',
      lifePoints: 40000,
      image: 'http://drive.google.com/uc?export=view&id=17cxrcyhBK5BPT4_WLZaNv6h2KjzeTH3U'
    },
    {
      id: 5,
      name: 'Morgott, the Omen King',
      area: 'Altus Plateau',
      location: 'Leyndell, Royal Capital',
      description: 'A lowly tarnished, in search of the Elden Ring, involvened by the flame of ambition, someone must extinguish thy flame',
      lifePoints: 10000,
      image: 'http://drive.google.com/uc?export=view&id=15bNSgRSxZa4bxDYASWEuISPNnz0afuqL'
    },
    {
      id: 6,
      name: 'Fire Giant',
      area: 'Mountaintops of the Giants',
      location: 'Flame Peak',
      description: 'A lowly tarnished, in search of the Elden Ring, involvened by the flame of ambition, someone must extinguish thy flame',
      lifePoints: 100000,
      image: 'http://drive.google.com/uc?export=view&id=1XhfRLo-xbGrLCNkAMG_NDpdFW7gNxA7p'
    },
    {
      id: 7,
      name: 'Dragonlord Placidusax',
      area: 'Crumbling Farum Azula',
      location: 'Unknown',
      description: 'A lowly tarnished, in search of the Elden Ring, involvened by the flame of ambition, someone must extinguish thy flame',
      lifePoints: 200000,
      image: 'http://drive.google.com/uc?export=view&id=1x-sM5Pg3eRf0bIL6Cxt-IYVLuN3BKM9m'
    },
    {
      id: 8,
      name: 'Beast Clergyman / Maliketh, the Black Blade',
      area: 'Crumbling Farum Azula',
      location: 'Crumbling Farum Azula',
      description: 'A lowly tarnished, in search of the Elden Ring, involvened by the flame of ambition, someone must extinguish thy flame',
      lifePoints: 40000,
      image: 'http://drive.google.com/uc?export=view&id=1SuZqaV0s6S8EPRxnrztEz8aHREbeNRYm'
    },
  ]

  private _boss:BehaviorSubject<Boss[]> = new BehaviorSubject(this._bossList);
  public boss$ = this._boss.asObservable();

  id:number = this._bossList.length+1;
  constructor(
    
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

  getBossById(id: number) {
    return this._bossList.find(b=>b.id==id);
  }

  updateBoss(boss:Boss){
    var _boss = this._bossList.find(b=>b.id==boss.id);
    if(_boss){
      _boss.name = boss.name;
      _boss.area = boss.area;
      _boss.location = boss.location;
      _boss.description = boss.description;
      _boss.lifePoints = boss.lifePoints;
      _boss.image = boss.image;
    }
    
    this._boss.next(this._bossList);
  }

  deleteBossById(id:number){
    this._bossList = this._bossList.filter(b=>b.id != id); 
    this._boss.next(this._bossList);
  }
}
