import { Component, OnInit } from '@angular/core';
import { BossService } from 'src/app/core/services/boss.service';

@Component({
  selector: 'app-bosses',
  templateUrl: './bosses.page.html',
  styleUrls: ['./bosses.page.scss'],
})
export class BossesPage implements OnInit {

  constructor(
    private data: BossService,
  ) { }

  ngOnInit() {
  }

  getBoss() {
    return this.data.boss$;
  }

}
