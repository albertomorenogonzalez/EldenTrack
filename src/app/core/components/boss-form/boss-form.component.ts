import { Component, Input, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ModalController } from '@ionic/angular';
import { Boss } from '../../models/boss.model';

@Component({
  selector: 'app-boss-form',
  templateUrl: './boss-form.component.html',
  styleUrls: ['./boss-form.component.scss'],
})
export class BossFormComponent implements OnInit {

  form:FormGroup;
  mode:"New" | "Edit" = "New";
  @Input('boss') set boss(boss:Boss){
    if(boss){
      this.form.controls['id'].setValue(boss.id);
      this.form.controls['name'].setValue(boss.name);
      this.form.controls['area'].setValue(boss.area);
      this.form.controls['location'].setValue(boss.location);
      this.form.controls['description'].setValue(boss.description);
      this.form.controls['lifePoints'].setValue(boss.lifePoints);
      this.form.controls['image'].setValue(boss.image);
      this.mode = "Edit";
    }
  }

  constructor(
    private fb:FormBuilder,
    private modal:ModalController
  ) { 
    this.form = this.fb.group({
      id:[null],
      name:["", [Validators.required]],
      area:["", [Validators.required]],
      location:["", [Validators.required]],
      description:["", [Validators.required]],
      lifePoints:["", [Validators.required]],
      image:["http://drive.google.com/uc?export=view&id=1vSlO45EELqrz7Vh-Avm440NtGh3_7XKM", [Validators.required]]
    });
  }

  ngOnInit() {
  }


  onSubmit(){
    
    this.modal.dismiss({boss: this.form.value, mode:this.mode}, 'ok');
  }

  onDismiss(){
    this.modal.dismiss(null, 'cancel');
  }


}
