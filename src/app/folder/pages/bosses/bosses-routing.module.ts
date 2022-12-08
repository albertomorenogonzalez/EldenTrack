import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { BossesPage } from './bosses.page';

const routes: Routes = [
  {
    path: '',
    component: BossesPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class BossesPageRoutingModule {}
