import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ModalController, ToastController } from '@ionic/angular';
import { TranslateService } from '@ngx-translate/core';
import { lastValueFrom } from 'rxjs';
import { PasswordValidation } from '../../utils';

@Component({
  selector: 'app-register-form',
  templateUrl: './register-form.component.html',
  styleUrls: ['./register-form.component.scss'],
})
export class RegisterFormComponent implements OnInit {

  form:FormGroup;
  mode:"New" | "Edit" = "New";
  constructor(
    private fb:FormBuilder,
    private modal:ModalController,
    private toastController: ToastController,
    private translate: TranslateService
  ) {
    this.form = this.fb.group({
      id:[null],
      admin:[false],
      name:["", [Validators.required]],
      surname:["", [Validators.required]],
      birthdate:["", [Validators.required]],
      email:["", [Validators.required, Validators.email]],
      username:["", [Validators.required]],
      password:["", [Validators.required]],
      confirmPassword:["", Validators.required],
      profilePick:['https://ionicframework.com/docs/img/demos/avatar.svg']
    },{validator:[PasswordValidation.passwordMatch, PasswordValidation.passwordProto]});
  }

  ngOnInit() {}

  onRegister(){
    this.modal.dismiss({
      name:this.form.value.name,
      surname:this.form.value.surname,
      birthdate:this.form.value.birthdate,
      email:this.form.value.email,
      username:this.form.value.username,
      password:this.form.value.password,
      profilePick:this.form.value.profilePick
      
    }, 'ok');

    this.presentToastAdd();
  }

  hasFormError(error){
    return this.form?.errors && Object.keys(this.form.errors).filter(e=>e==error).length==1;
  }
  
  errorsToArray(errors){
   
    if(errors && !('required' in errors))
      return [Object.keys(errors)[0]];
    else
      return [];
  } 


  formatDate(date:moment.Moment){
    return date.format('YYYY-MM-DDT');
  }

  onDismiss(){
    this.modal.dismiss(null, 'cancel');
  }


  async presentToastAdd() {
    const toast = await this.toastController.create({
      message: await lastValueFrom(this.translate.get('toasts.userAdded')),
      duration: 1500,
      position: 'top',
      color: 'success'
    });

    await toast.present();
  }


  @ViewChild('passwordEyeRegister', { read: ElementRef }) passwordEye: ElementRef;

  passwordTypeInput  =  'password';

  togglePasswordMode() {
          
    this.passwordTypeInput = this.passwordTypeInput === 'text' ? 'password' : 'text';
      
      const nativeEl = this.passwordEye.nativeElement.querySelector('input');
      
      const inputSelection = nativeEl.selectionStart;
      
      nativeEl.focus();
      
      setTimeout(() => {
        nativeEl.setSelectionRange(inputSelection, inputSelection);
      }, 1);

  }

}
