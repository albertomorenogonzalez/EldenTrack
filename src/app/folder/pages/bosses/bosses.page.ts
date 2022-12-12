import { Component, OnInit } from '@angular/core';
import { AlertController, ModalController } from '@ionic/angular';
import { BossFormComponent } from 'src/app/core/components/boss-form/boss-form.component';
import { CompletedBossFormComponent } from 'src/app/core/components/completed-boss-form/completed-boss-form.component';
import { Boss } from 'src/app/core/models/boss.model';
import { CompletedBoss } from 'src/app/core/models/completed-boss.model';
import { BossService } from 'src/app/core/services/boss.service';
import { CompletedBossService } from 'src/app/core/services/completed-boss.service';

@Component({
  selector: 'app-bosses',
  templateUrl: './bosses.page.html',
  styleUrls: ['./bosses.page.scss'],
})
export class BossesPage implements OnInit {
  
  constructor(
    private data: BossService,
    private completedBossData: CompletedBossService,
    private alert: AlertController,
    private modal: ModalController,
  ) { }

  ngOnInit() {
  }

  getBossList() {
    return this.data.boss$;
  }

  async presentBossForm(boss?:Boss){
    const modal = await this.modal.create({
      component:BossFormComponent,
      componentProps:{
        boss:boss
      }
    });
    modal.present();
    modal.onDidDismiss().then(result=>{
      if(result && result.data){
        switch(result.data.mode){
          case 'New':
            this.data.addBoss(result.data.boss);
            break;
          case 'Edit':
            this.data.updateBoss(result.data.boss);
            break;
          default:
        }
      }
    });
  }

  onNewBoss(){
    this.presentBossForm();  
  }

  onEditBoss(boss: Boss){
    this.presentBossForm(boss);
  }

  async onDeleteAlert(boss: Boss){
    const alert = await this.alert.create({
      header: await 'Atención',
      message: await '¿Está seguro de que quiere borrar este jefe?',
      buttons: [
        {
          text: await 'Cancelar',
          role: 'cancel',
          handler: () => {
            console.log("Operacion cancelada");
          },
        },
        {
          text: await 'Borrar',
          role: 'confirm',
          handler: () => {
            this.data.deleteBossById(boss.id);
          },
        },
      ],
    });

    await alert.present();

    const { role } = await alert.onDidDismiss();
  }


  onDeleteBoss(boss: Boss){
     this.onDeleteAlert(boss);
  }  
}
