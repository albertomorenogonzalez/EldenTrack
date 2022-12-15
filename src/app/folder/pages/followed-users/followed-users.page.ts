import { Component, OnInit } from '@angular/core';
import { AlertController, ToastController } from '@ionic/angular';
import { Observable } from 'rxjs';
import { Boss, Follow, User, UserService } from 'src/app/core';
import { FollowService } from 'src/app/core/services/follow.service';

@Component({
  selector: 'app-followed-users',
  templateUrl: './followed-users.page.html',
  styleUrls: ['./followed-users.page.scss'],
})
export class FollowedUsersPage implements OnInit {

  constructor(
    private userData: UserService,
    private followData: FollowService,
    private toastController: ToastController,
    private alert: AlertController
  ) { }

  ngOnInit() {
  }

  getCurrentUser(){
    return this.userData.currentUser;
  }

  unfollow(follow: Follow) {
    this.onUnfollowAlert(follow);
  }

  getFollowList() {
    return this.followData.follow$;
  }

  getUserList() {
    return this.userData.user$;
  }

  getFollowedUsers() {
    return this.followData.getFollowedUsers(this.getCurrentUser()?.id);
  }

  getUserById(idFollowed: number) {
    return this.userData.getUserById(idFollowed);
  }

  getItemDisplay(follow: Follow) {
    var display = 'inline';

    if (this.getUserById(follow.idFollowed)==null || follow.idUser!=this.getCurrentUser()?.id) {
      display = 'none';
    } else {
      display = 'inline';
    }

    return display;
  }

  async onUnfollowAlert(follow: Follow){
    const alert = await this.alert.create({
      header: await 'Atención',
      message: await '¿Está seguro de que quiere dejar de seguir a este usuario?',
      buttons: [
        {
          text: await 'Cancelar',
          role: 'cancel',
          handler: () => {
            console.log("Operacion cancelada");
          },
        },
        {
          text: await 'Dejar de Seguir',
          role: 'confirm',
          handler: () => {
            this.followData.unfollowById(follow.idFollowed);
            this.presentToastUnfollow(follow.idFollowed);
          },
        },
      ],
    });

    await alert.present();

    const { role } = await alert.onDidDismiss();
  }

  async presentToastUnfollow(idFollowed: number) {
    const toast = await this.toastController.create({
      message: 'Has dejado de seguir a ' + this.getUserById(idFollowed)?.username,
      duration: 1500,
      position: 'top',
      color: 'danger'
    });

    await toast.present();
    
  }

}
