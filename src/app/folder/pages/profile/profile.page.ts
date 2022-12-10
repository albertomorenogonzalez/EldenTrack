import { Component, OnInit } from '@angular/core';
import { AlertController, ModalController } from '@ionic/angular';
import { RegisterFormComponent } from 'src/app/core';
import { CompletedBossFormComponent } from 'src/app/core/components/completed-boss-form/completed-boss-form.component';
import { CompletedBoss } from 'src/app/core/models/completed-boss.model';
import { User } from 'src/app/core/models/user.model';
import { CompletedBossService } from 'src/app/core/services/completed-boss.service';
import { UserService } from 'src/app/core/services/user.service';

@Component({
  selector: 'app-profile-page',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage implements OnInit {

  constructor(
    private userData: UserService,
    private completedBossData: CompletedBossService,
    private alert: AlertController,
    private modal: ModalController
  ) { 

  }

  ngOnInit() {
  }

  getUserActive():User|undefined {
    return this.userData.currentUser;
  }

  getCompletedBosses() {
    return this.completedBossData.completedBoss$;
  }

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
          case 'Edit':
            this.completedBossData.updateCompletedBoss(result.data.completedb);
            break;
          default:
        }
      }
    });
  }

  onEditCompletedBoss(completedb: CompletedBoss){
    this.presentCompletedBossForm(completedb);
  }

  async presentUserForm(user?:User){
    const modal = await this.modal.create({
      component:RegisterFormComponent,
      componentProps:{
        user:user
      }
    });
    modal.present();
    modal.onDidDismiss().then(result=>{
      if(result && result.data){
        switch(result.data.mode){
          case 'Edit':
            this.userData.updateUser(result.data.user);
            break;
          default:
        }
      }
    });
  }

  onEditProfile(user: User) {
    this.presentUserForm(user);
  }

  async onDeleteAlert(completedb: CompletedBoss){
    const alert = await this.alert.create({
      header: await 'Atención',
      message: await '¿Está seguro de que quiere borrar este jefe completado?',
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
            this.completedBossData.deleteCompletedBossById(completedb.id);
          },
        },
      ],
    });

    await alert.present();

    const { role } = await alert.onDidDismiss();
  }

  

  onDeleteCompletedBoss(completedb: CompletedBoss){
     this.onDeleteAlert(completedb);
  }  

}
