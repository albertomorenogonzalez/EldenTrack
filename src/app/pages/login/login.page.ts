import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
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
    private fb:FormBuilder
  ) { 
    this.form = this.fb.group({
      username:["Gyobu Oniwa", [Validators.required]],
      password:["Ashina3", [Validators.required]],
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

  onNewUser() {
    this.router.navigate(['register']);
  }

  

}
