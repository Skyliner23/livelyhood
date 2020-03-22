import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TestDatabasePage } from './test-database.page';

const routes: Routes = [
  {
    path: '',
    component: TestDatabasePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TestDatabasePageRoutingModule {}
