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
      description: 'Margit, the Fell Omen is found in Stormhill when players attempt to approach Stormveil Castle. A non-boss variant can be found later again when approaching a stationary enemy slightly southwest of the Outer Wall Battleground Site of Grace in the Capital Outskirts. Margit stands in the Tarnished`s way to prevent them from approaching the Elden Ring, though his motivations are only explained in a later encounter.',
      lifePoints: 4174,
      image: 'http://drive.google.com/uc?export=view&id=1Ad_-TXFOA-4Xik_Wj6YZY62JNfZbxhVp'
    },
    {
      id: 2,
      name: 'Godrick, the Grafted',
      area: 'Limgrave',
      location: 'StormVeil Castle',
      description: 'Godrick the Grafted is the ruler of Stormveil Castle, and is one of the first demigods and shardbearers that players can fight. He is a descendant of Godfrey and thus born of the golden lineage, but Gideon and Kenneth Haight believe him to be weak and unworthy to rule. Much of Godrick`s power comes from the arms and legs of soldiers he`s grafted onto himself, and especially the dragon head grafted onto his left arm during the second phase of his fight. His knights and soldiers wear armor that bears emblems of the golden lineage: a two-headed war-axe and the beast regent, Serosh.',
      lifePoints: 6080,
      image: 'http://drive.google.com/uc?export=view&id=1oWChqyygiekTcoDA6yxct-ZYnraNAPKe'
    },
    {
      id: 3,
      name: 'Rennala, Queen of the Full Moon',
      area: 'Liurnia of the Lakes',
      location: 'Academy of Raya Lucaria',
      description: 'Rykard, Lord of Blasphemy is the true form of the God-Devouring Serpent, whose body has been taken over by Rykard. Players can fight him at the Volcano Manor in Mt. Gelmir and is one of the shardbearers players may fight to access Leyndell. He was revered by his supporters for seeking to overthrow the Golden Order. However when he offered himself up to the serpent in a pursuit of immortality, most of his followers turned on him and sought to bring him down with the Serpent-Hunter.',
      lifePoints: 59174,
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
      description: 'Morgott is the true identity of Margit, the Fell Omen, and the self-proclaimed "Last of All Kings". He is found in Leyndell, Royal Capital. When he and his twin brother Mohg were born, they were imprisoned deep in the Subterranean Shunning-Grounds for being born as Omen royalty. Despite how it treated him, Morgott still loved the Golden Order, and he defended the capital when his fellow demigods invaded during the Shattering. His loyalty was unfortunately not enough for him to be considered worthy of the Elden Throne, however.',
      lifePoints: 10399,
      image: 'http://drive.google.com/uc?export=view&id=15bNSgRSxZa4bxDYASWEuISPNnz0afuqL'
    },
    {
      id: 6,
      name: 'Fire Giant',
      area: 'Mountaintops of the Giants',
      location: 'Flame Peak',
      description: 'The Fire Giant, the last known survivor of the War against the Giants, is a massive humanoid with a face on its chest, and is found in the Mountaintops of the Giants. The Fire Giants worshipped the One-Eyed/Fell God and was one of the few factions Queen Marika waged war on. The Golden Order feared the `flame of ruin`` capable of burning down the Erdtree found within their forge, and so it is believed that Marika slew their god and cursed the last of the Fire Giants to guard the forge for eternity.',
      lifePoints: 43623,
      image: 'http://drive.google.com/uc?export=view&id=1XhfRLo-xbGrLCNkAMG_NDpdFW7gNxA7p'
    },
    {
      id: 7,
      name: 'Dragonlord Placidusax',
      area: 'Crumbling Farum Azula',
      location: 'Unknown',
      description: 'Dragonlord Placidusax is a massive, two-headed dragon found in Crumbling Farum Azula. The Old Lord´s Talisman suggests that Placidusax had at least two more heads that had been removed by the time the Tarnished reaches him. He used to rule over the Lands Between at some time before the reign of Marika and the Golden Order and his god, the outer god of dragons, left. The Ancient Dragon and Somber Ancient Dragon Smithing Stones are said to be scales of the Dragonlord. Due to their unique ability to twist time, Weapons upgraded with these Smithing Stones are capable of harming and slaying gods.',
      lifePoints: 26651,
      image: 'http://drive.google.com/uc?export=view&id=1x-sM5Pg3eRf0bIL6Cxt-IYVLuN3BKM9m'
    },
    {
      id: 8,
      name: 'Beast Clergyman / Maliketh, the Black Blade',
      area: 'Crumbling Farum Azula',
      location: 'Crumbling Farum Azula',
      description: 'Maliketh is the second and final form of the Beast Clergyman who is found in Crumbling Farum Azula. The transitional cutscene shows the Clergyman`s cloak being burnt off to reveal his armor and Maliketh pulling out the Black Blade from his left hand. Similar to how Blaidd is to Ranni, Maliketh is Queen Marika`s shadow-bound beast. He was tasked to guard the Rune of Death, but his failure to do so led to the Night of the Black Knives. In order for this to never happen again, he imbued the rune into his very flesh.',
      lifePoints: 10620,
      image: 'http://drive.google.com/uc?export=view&id=1SuZqaV0s6S8EPRxnrztEz8aHREbeNRYm'
    },
    {
      id: 9,
      name: 'Malenia, Blade of Miquella',
      area: 'Miquella`s Haligtree',
      location: 'Elphael, Brace of the Haligtree',
      description: 'Malenia was born as a twin to Miquella, the most powerful of the Empyreans. She is renowned for her legendary battle against Starscourge Radahn during the Shattering, during which she unleashed the power of the Scarlet Rot, reducing Caelid to ruins. Wielding a prosthetic arm and leg, Malenia is located in Elphael, Brace of the Haligtree',
      lifePoints: 33251,
      image: 'http://drive.google.com/uc?export=view&id=1I5Tjp9QCEpCGGJN5dp8JlKQZeNl4DoSl'
    },
  ]

  private _boss:BehaviorSubject<Boss[]> = new BehaviorSubject(this._bossList);
  public boss$ = this._boss.asObservable();

  public addedBoss:Boss|undefined;

  id:number = this._bossList.length+1;
  constructor(
    
  ) { 
  }

  getBossList(){
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
