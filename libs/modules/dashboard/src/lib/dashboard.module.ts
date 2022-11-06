import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ChartModule } from 'primeng/chart';
import ChartDataLabels from 'chartjs-plugin-datalabels';

import * as fromPages from './pages';
import { DashboardRoutingModule } from './dashboard.routing.module';
import { Chart } from 'chart.js';

@NgModule({
  imports: [CommonModule, ChartModule, DashboardRoutingModule],
  declarations: [fromPages.pages]
})
export class DashboardModule { }
