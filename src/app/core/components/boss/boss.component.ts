import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { Boss } from '../../models/boss.model';
import { CompletedBoss } from '../../models/completed-boss.model';
import { BossService } from '../../services';
import { CompletedBossService } from '../../services/completed-boss.service';
import { LocaleService } from '../../services/localeService';
import { CompletedBossFormComponent } from '../completed-boss-form/completed-boss-form.component';

@Component({
  selector: 'app-boss',
  templateUrl: './boss.component.html',
  styleUrls: ['./boss.component.scss'],
})
export class BossComponent implements OnInit {

  @Output() onEdit = new EventEmitter;
  @Output() onDelete = new EventEmitter;
  @Input() boss!: Boss;

  constructor(
    private modal: ModalController,
    private completedBossData: CompletedBossService,
    public locale:LocaleService,
    private data: BossService
  ) { }

  ngOnInit() {}

  async presentCompletedBossForm(completedb?:CompletedBoss){
    const modal = await this.modal.create({
      component:CompletedBossFormComponent,
      componentProps:{
        completedb:completedb
      }
    });
    modal.present();
    modal.onDidDismiss().then(result=>{
      if(result && result.data){
        switch(result.data.mode){
          case 'New':
            this.completedBossData.addCompletedBoss(result.data.completedb);
            break;
          default:
        }
      }
    });
  }

  onNewCompletedBoss(boss: Boss){
    this.presentCompletedBossForm();  
    this.data.addedBoss = boss;
  }

  onEditClick(){
    this.onEdit.emit(this.boss);
  }

  onDeleteClick(){
    this.onDelete.emit(this.boss);
  }

}
