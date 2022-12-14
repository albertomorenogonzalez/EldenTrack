import { Component, Input, OnInit } from '@angular/core';
import { Boss, User } from '../../models';
import { CompletedBossService, UserService } from '../../services';

@Component({
  selector: 'app-user-completed-bosses',
  templateUrl: './user-completed-bosses.component.html',
  styleUrls: ['./user-completed-bosses.component.scss'],
})
export class UserCompletedBossesComponent implements OnInit {

  @Input() user: User | undefined;
  @Input() boss: Boss | undefined;

  constructor(
    private userData: UserService,
    private completedbData: CompletedBossService
  ) { }

  ngOnInit() {}

  getCompletedBosses() {
    return this.completedbData.completedBoss$
  }

  getProgress(user: User) {
    return this.userData.progress(user);
  }

  getPercentace(user: User) {
    return this.getProgress(user) * 100;
  }
}
