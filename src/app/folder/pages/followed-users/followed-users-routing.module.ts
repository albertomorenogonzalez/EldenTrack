import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { FollowedUsersPage } from './followed-users.page';

const routes: Routes = [
  {
    path: '',
    component: FollowedUsersPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class FollowedUsersPageRoutingModule {}
