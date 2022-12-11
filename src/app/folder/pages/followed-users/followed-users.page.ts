import { Component, OnInit } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { UserService } from 'src/app/core';
import { FollowService } from 'src/app/core/services/follow.service';

@Component({
  selector: 'app-followed-users',
  templateUrl: './followed-users.page.html',
  styleUrls: ['./followed-users.page.scss'],
})
export class FollowedUsersPage implements OnInit {

  constructor(
    private userData: UserService,
    private data: FollowService,
  ) { }

  ngOnInit() {
  }

  getUserByFollow() {
    return this.userData.user$;
  }

  onDeleteUser() {

  }
}
