import { Component, OnInit } from '@angular/core';
import { AlertController, ToastController } from '@ionic/angular';
import { FollowService, UserService } from 'src/app/core';
import { User } from 'src/app/core/models/user.model';

@Component({
  selector: 'app-explore',
  templateUrl: './explore.page.html',
  styleUrls: ['./explore.page.scss'],
})
export class ExplorePage implements OnInit {

  constructor(
    private userData: UserService,
    private alert: AlertController
  ) { }

  ngOnInit() {
  }

  getUserList() {
    return this.userData.user$;
  }

  async onDeleteAlert(user: User){
    const alert = await this.alert.create({
      header: await 'Atención',
      message: await '¿Está seguro de que quiere borrar este usuario?',
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
            this.userData.deleteUserById(user.id);
          },
        },
      ],
    });

    await alert.present();

    const { role } = await alert.onDidDismiss();
  }

  

  onDeleteUser(user: User){
     this.onDeleteAlert(user);
  } 
  
  getCurrentUser(){
    return this.userData.currentUser;
  }

  getItemDisplay(idUser: number): string {
    var display = 'inline';

    if (idUser==this.getCurrentUser()?.id) {
      display = 'none';
    } else {
      display = 'inline';
    }

    return display;
  }

}
