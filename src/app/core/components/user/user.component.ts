import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { AlertController, ModalController, ToastController } from '@ionic/angular';
import { FollowFormComponent } from '..';
import { Boss, Follow } from '../../models';
import { User } from '../../models/user.model';
import { FollowService, UserService } from '../../services';
import { LocaleService } from '../../services/localeService';
import { UserCompletedBossesComponent } from '../user-completed-bosses/user-completed-bosses.component';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss'],
})
export class UserComponent implements OnInit {

  @Output() onEdit = new EventEmitter;
  @Output() onDelete = new EventEmitter;
  @Input() follow!: Follow;
  @Input() user: User | undefined;
  @Input() boss!: Boss;
  
  constructor(
    private userData: UserService,
    private followData: FollowService,
    public locale:LocaleService,
    private toastController: ToastController,
    private modal:ModalController,
    private alert:AlertController
  ) { }

  ngOnInit() {}

  isFollowPage() {
    return this.followData.followPage;
  }

  onEditClick(){
    this.onEdit.emit(this.user);
  }

  onDeleteClick(){
    this.onDelete.emit(this.user);
  }

  getProgress(user: User) {
    return this.userData.progress(user);
  }

  userIsFollowed(idFollowed: number) {
    return this.followData.getFollowByIdFollowed(idFollowed, this.getCurrentUser()?.id);
  }

  getPercentace(user: User): number {
    return this.getProgress(user) * 100;
  }

  getProgressInNumbers(user:User): string {
    return '(' + this.userData.numberOfBossesCompleted(user) + '/' + this.userData.numberOfTotalBosses() + ')' ;
  }

  getCurrentUser() {
    return this.userData.currentUser;
  }

  async presentFollowForm(follow?:Follow){
    const modal = await this.modal.create({
      component:FollowFormComponent,
      componentProps:{
        follow:follow
      },
      cssClass:'follow'
    });
    modal.present();
    modal.onDidDismiss().then(result=>{
      if(result && result.data){
        this.followData.follow(result.data.follow);
      }
    });
  }

  onFollowUser(idUser: number) {
    this.presentFollowForm();
    this.followData.idUser = this.getCurrentUser()?.id;
    this.followData.idFollowed = idUser;
  }

  onUnfollowUser(idFollowed: number) {
    this.onUnfollowAlert(this.followData.getFollowByIdFollowed(idFollowed));
  }



  
  showCompletedBosses(user: User, boss: Boss) {
    this.userInformation(user, boss);
  }

  async userInformation(user: User, boss: Boss) {
    const modal = await this.modal.create({
      component:UserCompletedBossesComponent,
      componentProps:{
        user:user, boss:boss
      }
      
    });
    modal.present();
  }


  async onUnfollowAlert(follow?: Follow){
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
            this.followData.unfollowById(follow?.idFollowed);
            this.presentToastUnfollow();
          },
        },
      ],
    });

    await alert.present();

    const { role } = await alert.onDidDismiss();
  }


  async presentToastUnfollow() {
    const toast = await this.toastController.create({
      message: 'Has dejado de seguir a ' + this.user?.username,
      duration: 1500,
      position: 'top',
      color: 'danger'
    });

    await toast.present();
    
  }
}
