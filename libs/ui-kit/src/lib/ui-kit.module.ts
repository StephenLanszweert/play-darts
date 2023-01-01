import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import * as fromComponents from './components';
import { OverlayPanelModule } from 'primeng/overlaypanel';
import { ToggleButtonModule } from 'primeng/togglebutton';
import { DropdownModule } from 'primeng/dropdown';
import { FormsModule } from '@angular/forms';
import { CoreModule } from '@playdarts/core';

@NgModule({
  imports: [CoreModule, CommonModule, DropdownModule, FormsModule, OverlayPanelModule, ToggleButtonModule],
  declarations: [fromComponents.components],
  exports: [fromComponents.components],
})
export class UiKitModule { }
