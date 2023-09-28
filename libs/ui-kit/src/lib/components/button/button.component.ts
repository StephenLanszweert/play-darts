import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'playdarts-button',
  templateUrl: './button.component.html',
  styleUrls: ['./button.component.scss'],
})
export class ButtonComponent {
  @Input() fillMode: 'outline' | 'fill' = 'fill';
  @Output() clicked = new EventEmitter<void>();
}
