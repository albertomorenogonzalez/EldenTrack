import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AlertController } from '@ionic/angular';
import { ModalController } from '@ionic/angular/providers/modal-controller';
import * as moment from 'moment-timezone';
import { UserService } from 'src/app/core';
import { User } from 'src/app/core/models/user.model';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {

  constructor() {}

  ngOnInit() {

  }
}
