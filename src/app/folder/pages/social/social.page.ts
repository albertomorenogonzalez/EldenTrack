import { Component, OnInit } from '@angular/core';
import { FollowService } from 'src/app/core';

@Component({
  selector: 'app-social',
  templateUrl: './social.page.html',
  styleUrls: ['./social.page.scss'],
})
export class SocialPage implements OnInit {

  constructor(
    private followData: FollowService
  ) {
  }

  ngOnInit() {
    
  }

  isFollowPage() {
    return this.followData.followPage = false;
  }

  isNotFollowPage() {
    return this.followData.followPage = true;
  }


}
