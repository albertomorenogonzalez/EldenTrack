import { Component, Input, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ModalController } from '@ionic/angular';
import { CompletedBoss } from '../../models/completed-boss.model';
import { UserService } from '../../services';
import { BossComponent } from '../boss/boss.component';
import { CompletedBossComponent } from '../completed-boss/completed-boss.component';

@Component({
  selector: 'app-completed-boss-form',
  templateUrl: './completed-boss-form.component.html',
  styleUrls: ['./completed-boss-form.component.scss'],
})
export class CompletedBossFormComponent implements OnInit {

  form:FormGroup;
  mode:"New" | "Edit" = "New";
  @Input('CompletedBoss') set completedb(completedb:CompletedBoss){
    if(completedb){
      this.form.controls['id'].setValue(completedb.id);
      this.form.controls['idBoss'].setValue(completedb.idBoss);
      this.form.controls['idUser'].setValue(completedb.idUser);
      this.form.controls['startDate'].setValue(completedb.startDate);
      this.form.controls['finishDate'].setValue(completedb.finishDate);
      this.form.controls['notes'].setValue(completedb.notes);
      this.mode = "Edit";
    }
  }

  constructor(
    private fb:FormBuilder,
    private modal:ModalController,
    private data: UserService,
    private completedbData: CompletedBossComponent
  ) { 
    this.form = this.fb.group({
      id:[null],
      idBoss:["", [Validators.required]],
      idUser:[this.data.currentUser?.id, [Validators.required]],
      startDate:[""],
      finishDate:[""],
      notes:[""]
    });
  }

  ngOnInit() {
  }

  formatDate(date:moment.Moment){
    return date.format('YYYY-MM-DDT');
  }

  onSubmit(){
    this.modal.dismiss({completedb: this.form.value, mode:this.mode}, 'ok');
  }

  onDismiss(){
    this.modal.dismiss(null, 'cancel');
  }

  getBossById(id: number) {
    return this.completedbData.getBossById(id);
  }

}
