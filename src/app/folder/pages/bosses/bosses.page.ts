import { Component, OnInit } from '@angular/core';
import { AlertController, ModalController, ToastController } from '@ionic/angular';
import { UserService } from 'src/app/core';
import { BossFormComponent } from 'src/app/core/components/boss-form/boss-form.component';
import { Boss } from 'src/app/core/models/boss.model';
import { BossService } from 'src/app/core/services/boss.service';

@Component({
  selector: 'app-bosses',
  templateUrl: './bosses.page.html',
  styleUrls: ['./bosses.page.scss'],
})
export class BossesPage implements OnInit {
  
  constructor(
    private bossData: BossService,
    private userData: UserService,
    private alert: AlertController,
    private modal: ModalController,
    private toastController: ToastController
  ) { }

  ngOnInit() {
  }

  getBossList() {
    return this.bossData.boss$;
  }

  getCurrentUser() {
    return this.userData.currentUser;
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
            this.bossData.addBoss(result.data.boss);
            this.presentToastAdd();
            break;
          case 'Edit':
            this.bossData.updateBoss(result.data.boss);
            this.presentToastUpdate();
            break;
          default:
        }
      }
    });
  }

  onNewBoss(){
    if (this.getCurrentUser()?.admin) {
      this.presentBossForm();
    } else {
      this.onUserNotAdmin();
    }
    
  }

  onEditBoss(boss: Boss){
    if (this.getCurrentUser()?.admin) {
      this.presentBossForm(boss);
    } else {
      this.onUserNotAdmin();
    }
    
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
            this.bossData.deleteBossById(boss.id);
            this.presentToastDelete();
          },
        },
      ],
    });

    await alert.present();

    const { role } = await alert.onDidDismiss();
  }


  onDeleteBoss(boss: Boss){
    if (this.getCurrentUser()?.admin) {
      this.onDeleteAlert(boss);
    } else {
      this.onUserNotAdmin();
    }
     
  }  


  async onUserNotAdmin(){
    const alert = await this.alert.create({
      header: 'Permiso Denegado',
      message: await 'Necesita ser un administrador para realizar esta acción',
      buttons: [
        {
          text: await 'Cerrar',
          role: 'close',
          handler: () => {
           
          },
        },
      ],
    });

    await alert.present();

    const { role } = await alert.onDidDismiss();
  }


  async presentToastAdd() {
    const toast = await this.toastController.create({
      message: 'Jefe añadido con éxito',
      duration: 1500,
      position: 'top',
      color: 'success'
    });

    await toast.present();
    
  }

  async presentToastUpdate() {
    const toast = await this.toastController.create({
      message: 'Datos modificados con éxito',
      duration: 1500,
      position: 'top',
      color: 'success'
    });

    await toast.present();
    
  }

  async presentToastDelete() {
    const toast = await this.toastController.create({
      message: 'Jefe eliminado',
      duration: 1500,
      position: 'top',
      color: 'danger'
    });

    await toast.present();
    
  }


}
