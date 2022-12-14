import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ModalController, ToastController } from '@ionic/angular';
import { FollowFormComponent } from '..';
import { Boss, Follow } from '../../models';
import { User } from '../../models/user.model';
import {  FollowService, UserService } from '../../services';
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
    private modal:ModalController
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

  getPercentace(user: User): number {
    return this.getProgress(user) * 100;
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

}
