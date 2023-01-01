import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ChartModule } from 'primeng/chart';
import ChartDataLabels from 'chartjs-plugin-datalabels';

import * as fromPages from './pages';
import { DashboardRoutingModule } from './dashboard.routing.module';
import { Chart } from 'chart.js';
import { UiKitModule } from '@playdarts/ui-kit';
import * as fromComponents from './components';
import { ButtonModule } from 'primeng/button';

@NgModule({
  imports: [ButtonModule, CommonModule, ChartModule, DashboardRoutingModule, UiKitModule],
  declarations: [fromPages.pages, fromComponents.components],
  exports: [fromComponents.components]
})
export class DashboardModule { }
