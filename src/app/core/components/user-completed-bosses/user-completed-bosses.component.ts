import { Component, Input, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { Boss, User } from '../../models';
import { CompletedBossService, LocaleService, UserService } from '../../services';

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
    private completedbData: CompletedBossService,
    public locale:LocaleService,
    public modal: ModalController
  ) { }

  ngOnInit() {}

  getProgressInNumbers(user:User): string {
    return '(' + this.userData.numberOfBossesCompleted(user) + '/' + this.userData.numberOfTotalBosses() + ')' ;
  }

  getCompletedBosses() {
    return this.completedbData.completedBoss$
  }

  getProgress(user: User) {
    return this.userData.progress(user);
  }

  getPercentace(user: User): string {
    return (this.getProgress(user) * 100).toFixed(2);
  }

  onDismiss(result: any){
    this.modal.dismiss(null, 'cancel');
  }
}
