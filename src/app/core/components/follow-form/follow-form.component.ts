import { Component, Input, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ModalController, ToastController } from '@ionic/angular';
import { TranslateService } from '@ngx-translate/core';
import { lastValueFrom } from 'rxjs';
import { Follow } from '../../models';
import { FollowService, UserService } from '../../services';

@Component({
  selector: 'app-follow-form',
  templateUrl: './follow-form.component.html',
  styleUrls: ['./follow-form.component.scss'],
})
export class FollowFormComponent implements OnInit {

  form:FormGroup;
  @Input('follow') set follow(follow:Follow) {
    if(follow) {
      this.form.controls['id'].setValue(follow.id);
      this.form.controls['idUser'].setValue(follow.idUser);
      this.form.controls['idFollowed'].setValue(follow.idFollowed);
    }
  }

  constructor(
    private userData: UserService,
    private followData: FollowService,
    private fb:FormBuilder,
    private modal:ModalController,
    private toastController: ToastController,
    private translate: TranslateService
  ) { 
    this.form = this.fb.group({
      id:[null],
      idUser:[this.followData.idUser, [Validators.required]],
      idFollowed:[this.followData.idFollowed, [Validators.required]]
    });
  }

  ngOnInit() {
  }
  

  onSubmit(){
    this.modal.dismiss({follow: this.form.value}, 'ok');
    this.presentToastFollow();
  }

  onDismiss(){
    this.modal.dismiss(null, 'cancel');
  }

  getUserById() {
    return this.userData.getUserById(this.followData.idFollowed);
  }

  async presentToastFollow() {
    const toast = await this.toastController.create({
      message: await lastValueFrom(this.translate.get('toasts.startedFollow')) + this.getUserById()?.username + '!',
      duration: 1500,
      position: 'top',
      color: 'success'
    });

    await toast.present();
    
  }

}


