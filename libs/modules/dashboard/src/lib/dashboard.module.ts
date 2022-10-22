import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import * as fromPages from './pages';
import { DashboardRoutingModule } from './dashboard.routing.module';

@NgModule({
  imports: [CommonModule, DashboardRoutingModule],
  declarations: [fromPages.pages]
})
export class DashboardModule { }
