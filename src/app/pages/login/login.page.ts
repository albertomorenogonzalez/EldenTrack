import { Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ModalController } from '@ionic/angular';
import { Subscription } from 'rxjs';
import { RegisterFormComponent } from 'src/app/core';
import { User } from 'src/app/core/models/user.model';
import { UserService } from 'src/app/core/services/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  form:FormGroup;
  constructor(
    private formBuilder:FormBuilder,
    private modal:ModalController,
    private user:UserService,
    private router:Router
  ) { 
    this.form = this.formBuilder.group({
      username:["", [Validators.required, Validators.email]],
      password:["", Validators.required]
    });
    
  }

  ngOnInit() {}

  async register(){
    const modal = await this.modal.create({
      component:RegisterFormComponent
    });

    modal.onDidDismiss().then(async(response)=>{
      try {
        if(response.role=='ok'){
          await this.user.register(response.data);
          this.router.navigate(['folder/home'], {replaceUrl:true});
        }
        
      } catch (error) {
        console.log(error);
  
      }
    });
    modal.present();
  }

  async onSignIn(){
    try {
      await this.user.login(this.form.value);
      this.router.navigate(['folder/home'], {replaceUrl:true});
    } catch (error) {
      console.log(error);

    }
    
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
