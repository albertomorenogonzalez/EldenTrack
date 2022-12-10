import { Component, OnInit } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { FollowService } from 'src/app/core/services/follow.service';

@Component({
  selector: 'app-followed-users',
  templateUrl: './followed-users.page.html',
  styleUrls: ['./followed-users.page.scss'],
})
export class FollowedUsersPage implements OnInit {

  constructor(
    private data: FollowService,
    private alert: AlertController,
  ) { }

  ngOnInit() {
  }

  getFollow() {
    return this.data.follow$;
  }
}
