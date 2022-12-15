import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { User } from '../../models/user.model';
import { LocaleService, UserService } from '../../services';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
})
export class ProfileComponent implements OnInit {

  @Output() onEdit = new EventEmitter;
  @Output() onDelete = new EventEmitter;
  @Input() user: User | undefined;
  
  constructor(
    private userData: UserService,
    public locale:LocaleService
  ) { }

  ngOnInit() {}

  onEditClick(){
    this.onEdit.emit(this.user);
  }

  getProgress(user: User) {
    return this.userData.progress(user);
  }

  getPercentace(user: User): string {
    return (this.getProgress(user) * 100).toFixed(2);
  }

  getProgressInNumbers(user:User): string {
    return '(' + this.userData.numberOfBossesCompleted(user) + '/' + this.userData.numberOfTotalBosses() + ')' ;
  }


}
