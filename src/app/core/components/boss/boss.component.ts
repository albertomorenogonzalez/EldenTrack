import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ModalController, ToastController } from '@ionic/angular';
import { TranslateService } from '@ngx-translate/core';
import { lastValueFrom } from 'rxjs';
import { Boss } from '../../models/boss.model';
import { CompletedBoss } from '../../models/completed-boss.model';
import { BossService, UserService } from '../../services';
import { CompletedBossService } from '../../services/completed-boss.service';
import { LocaleService } from '../../services/locale.service';
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
    private userData: UserService,
    private bossData: BossService,
    private toastController: ToastController,
    private translate: TranslateService
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
            this.presentToastAdd();
            break;
          default:
        }
      }
    });
  }

  getCurrentUser() {
    return this.userData.currentUser
  }

  completed() {
    return this.completedBossData.getBossCompletedByBossId(this.boss.id, this.getCurrentUser()?.id)
  }

  onNewCompletedBoss(boss: Boss){
    this.presentCompletedBossForm();  
    this.bossData.addedBoss = boss;
  }

  onEditClick(){
    this.onEdit.emit(this.boss);
  }

  onDeleteClick(){
    this.onDelete.emit(this.boss);
  }

  async presentToastAdd() {
    const toast = await this.toastController.create({
      message: await lastValueFrom(this.translate.get('toasts.completedBoss')),
      duration: 1500,
      position: 'top',
      color: 'success'
    });

    await toast.present();
    
  }

}
