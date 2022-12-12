import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { User } from '../../models/user.model';
import { BossService, CompletedBossService, UserService } from '../../services';
import { LocaleService } from '../../services/localeService';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss'],
})
export class UserComponent implements OnInit {

  @Output() onEdit = new EventEmitter;
  @Output() onDelete = new EventEmitter;
  @Input() user: User | undefined;
  
  constructor(
    private completedbData: CompletedBossService,
    private bossData: BossService,
    public locale:LocaleService
  ) { }

  ngOnInit() {}

  onFollowUser() {
    
  }

  onEditClick(){
    this.onEdit.emit(this.user);
  }

  onDeleteClick(){
    this.onDelete.emit(this.user);
  }

  progress(user: User) {
    var numberOfBossesCompleted = this.completedbData.getCompletedBossesByUserId(user.id).length

    var totalBosses = this.bossData.getBossList().length

    return (numberOfBossesCompleted/totalBosses);
  }

  

}
