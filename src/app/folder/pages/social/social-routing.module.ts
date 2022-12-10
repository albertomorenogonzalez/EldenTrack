import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SocialPage } from './social.page';

const routes: Routes = [
  {
    path: 'social',
    component: SocialPage,
    children: [
      {
        path: 'followed-users',
        loadChildren: () => import('../followed-users/followed-users.module').then( m => m.FollowedUsersPageModule)
      },
      {
        path: 'explore',
        loadChildren: () => import('../explore/explore.module').then( m => m.ExplorePageModule)
      },
      {
        path: '',
        redirectTo: 'social/followed-users',
        pathMatch: 'full'
      }
    ]
  },
  {
    path: '',
    redirectTo: 'social/followed-users',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SocialPageRoutingModule {}
