import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import * as fromComponents from './components';
import { OverlayPanelModule } from 'primeng/overlaypanel';
import { ToggleButtonModule } from 'primeng/togglebutton';
import { FormsModule } from '@angular/forms';

@NgModule({
  imports: [CommonModule, FormsModule, OverlayPanelModule, ToggleButtonModule],
  declarations: [fromComponents.components],
  exports: [fromComponents.components],
})
export class UiKitModule { }
