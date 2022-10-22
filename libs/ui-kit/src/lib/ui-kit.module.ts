import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import * as fromComponents from './components';
import { HomeComponent } from './components/home/home.component';

@NgModule({
  imports: [CommonModule],
  declarations: [fromComponents.components, HomeComponent],
  exports: [fromComponents.components, HomeComponent],
})
export class UiKitModule {}
