import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ChartModule } from 'primeng/chart';
import ChartDataLabels from 'chartjs-plugin-datalabels';

import * as fromPages from './pages';
import * as fromComponents from './components';
import { GameRoutingModule } from './game.routing.module';
import { UiKitModule } from '@playdarts/ui-kit';
import { ButtonModule } from 'primeng/button';
import { InputNumberModule } from 'primeng/inputnumber';
import { DropdownModule } from 'primeng/dropdown';
import { FormsModule } from '@angular/forms';

import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { HttpClientModule } from '@angular/common/http';
import { AngularSvgIconModule } from 'angular-svg-icon';

@NgModule({
  imports: [HttpClientModule, AngularSvgIconModule.forRoot(), ButtonModule, CommonModule, ConfirmDialogModule, ChartModule, DropdownModule, FormsModule, GameRoutingModule, InputNumberModule, UiKitModule],
  declarations: [fromPages.pages, fromComponents.components],
})
export class GameModule { }
