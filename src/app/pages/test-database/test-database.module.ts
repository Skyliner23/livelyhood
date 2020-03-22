import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { TestDatabasePageRoutingModule } from './test-database-routing.module';

import { TestDatabasePage } from './test-database.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TestDatabasePageRoutingModule
  ],
  declarations: [TestDatabasePage]
})
export class TestDatabasePageModule {}
