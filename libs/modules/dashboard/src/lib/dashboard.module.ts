import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ChartModule } from 'primeng/chart';
import ChartDataLabels from 'chartjs-plugin-datalabels';

import * as fromPages from './pages';
import { DashboardRoutingModule } from './dashboard.routing.module';
import { Chart } from 'chart.js';
import { UiKitModule } from '@playdarts/ui-kit';

@NgModule({
  imports: [CommonModule, ChartModule, DashboardRoutingModule, UiKitModule],
  declarations: [fromPages.pages]
})
export class DashboardModule { }
