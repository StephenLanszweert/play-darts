import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ChartModule } from 'primeng/chart';
import ChartDataLabels from 'chartjs-plugin-datalabels';

import * as fromPages from './pages';
import { GameRoutingModule } from './game.routing.module';
import { UiKitModule } from '@playdarts/ui-kit';

@NgModule({
  imports: [CommonModule, ChartModule, GameRoutingModule, UiKitModule],
  declarations: [fromPages.pages],
})
export class GameModule { }
