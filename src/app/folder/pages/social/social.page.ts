import { Component, OnInit } from '@angular/core';
import { ModalController, AlertController } from '@ionic/angular';
import { User } from 'src/app/core/models/user.model';
import { UserService } from 'src/app/core/services/user.service';

@Component({
  selector: 'app-social',
  templateUrl: './social.page.html',
  styleUrls: ['./social.page.scss'],
})
export class SocialPage implements OnInit {

  constructor(
    private data: UserService,
    private modal: ModalController,
    private alert: AlertController,
  ) { }

  ngOnInit() {
  }

  getUser() {
    return this.data.user$;
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
            this.data.deleteUserById(user.id);
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

}
