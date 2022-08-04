import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TakslistPage } from './takslist.page';

const routes: Routes = [
  {
    path: '',
    component: TakslistPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TakslistPageRoutingModule {}
