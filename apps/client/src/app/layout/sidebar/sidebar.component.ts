import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'playdarts-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss'],
})
export class SidebarComponent {
  @Input() expanded = true;

  @Output() onExpanded: EventEmitter<boolean> = new EventEmitter<boolean>();
}
