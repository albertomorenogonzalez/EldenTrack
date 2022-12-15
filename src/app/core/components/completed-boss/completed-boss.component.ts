import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { CompletedBoss } from '../../models/completed-boss.model';
import { BossService, LocaleService, UserService } from '../../services';

@Component({
  selector: 'app-completed-boss',
  templateUrl: './completed-boss.component.html',
  styleUrls: ['./completed-boss.component.scss'],
})
export class CompletedBossComponent implements OnInit {

  @Output() onEdit = new EventEmitter;
  @Output() onDelete = new EventEmitter;
  @Input() completedb!: CompletedBoss;

  constructor(
    private userData: UserService,
    private bossData: BossService,
    public locale:LocaleService
  ) { }

  ngOnInit() {}

  getUserById(id: number) {
    return this.userData.getUserById(id);
  }

  getCurrentUser() {
    return this.userData.currentUser
  }

  getBossById(id: number) {
    return this.bossData.getBossById(id);
  }

  onEditClick(){
    this.onEdit.emit(this.completedb);
  }

  onDeleteClick(){
    this.onDelete.emit(this.completedb);
  }

}
