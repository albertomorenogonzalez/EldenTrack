import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from '../../services';

@Component({
  selector: 'app-register-form',
  templateUrl: './register-form.component.html',
  styleUrls: ['./register-form.component.scss'],
})
export class RegisterFormComponent implements OnInit {

  form:FormGroup;
  

  constructor(
    private router:Router,
    private userData:UserService,
    private fb:FormBuilder
  ) { 
    this.form = this.fb.group({
      id:[null],
      admin:[false],
      name:["", [Validators.required]],
      surname:["", [Validators.required]],
      birthdate:["", [Validators.required]],
      email:["", [Validators.required]],
      username:["", [Validators.required]],
      password:["", [Validators.required]],
      profilePick:["", [Validators.required]]
    });
  }

  ngOnInit() {
  }


  formatDate(date:moment.Moment){
    return date.format('YYYY-MM-DDT');
  }
  

  onSubmit(){
    this.userData.addUser(this.form.value);
  }

  

}
