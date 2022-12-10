import { Component, Input, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ModalController } from '@ionic/angular';
import { User } from '../../models/user.model';

@Component({
  selector: 'app-register-form',
  templateUrl: './register-form.component.html',
  styleUrls: ['./register-form.component.scss'],
})
export class RegisterFormComponent implements OnInit {

  form:FormGroup;
  mode:"New" | "Edit" = "New";
  @Input('user') set user(user:User) {
    if(user) {
      this.form.controls['id'].setValue(user.id);
      this.form.controls['admin'].setValue(user.admin);
      this.form.controls['name'].setValue(user.name);
      this.form.controls['surname'].setValue(user.surname);
      this.form.controls['birthdate'].setValue(user.birthdate);
      this.form.controls['email'].setValue(user.email);
      this.form.controls['username'].setValue(user.username);
      this.form.controls['password'].setValue(user.password);
      this.form.controls['profilePick'].setValue(user.profilePick);
      this.mode = "Edit";
    }
  }

  constructor(
    private fb:FormBuilder,
    private modal:ModalController
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
    this.modal.dismiss({user: this.form.value, mode:this.mode}, 'ok');
  }

  onDismiss(){
    this.modal.dismiss(null, 'cancel');
  }

  

}
