import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ModalController } from '@ionic/angular';
import { Console } from 'console';
import { Subscription } from 'rxjs';
import { RegisterFormComponent } from 'src/app/core';
import { User } from 'src/app/core/models/user.model';
import { UserService } from 'src/app/core/services/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit, OnDestroy {

  form:FormGroup;
  subscr:Subscription;
  constructor(
    private router:Router,
    private userSvc:UserService,
    private modal: ModalController,
    private fb:FormBuilder
  ) { 
    this.form = this.fb.group({
      username:["", [Validators.required]],
      password:["", [Validators.required]],
    });
    this.subscr = this.userSvc.userConnected$.subscribe(connected=>{
      if(connected)
        this.router.navigate(['folder/home']);
    });
  }
  ngOnDestroy(): void {
    this.subscr.unsubscribe();
  }

  ngOnInit() {
  }

  onSubmit(){
    this.userSvc.validateUser(this.form.value);
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
          case 'New':
            this.userSvc.addUser(result.data.user);
            console.log(result.data.user)
            break;
          default:
        }
      }
    });
  }

  onNewUser() {
    this.presentUserForm();
  }

}
