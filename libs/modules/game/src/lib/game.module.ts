import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ChartModule } from 'primeng/chart';
import ChartDataLabels from 'chartjs-plugin-datalabels';

import * as fromPages from './pages';
import { GameRoutingModule } from './game.routing.module';
import { UiKitModule } from '@playdarts/ui-kit';
import { ButtonModule } from 'primeng/button';
import { InputNumberModule } from 'primeng/inputnumber';
import { DropdownModule } from 'primeng/dropdown';
import { FormsModule } from '@angular/forms';

@NgModule({
  imports: [ButtonModule, CommonModule, ChartModule, DropdownModule, FormsModule, GameRoutingModule, InputNumberModule, UiKitModule],
  declarations: [fromPages.pages],
})
export class GameModule { }
