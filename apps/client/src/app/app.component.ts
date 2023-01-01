import { Component } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';

@Component({
  selector: 'playdarts-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'client';
  sidebarExpanded$ = new BehaviorSubject<boolean>(true);
  darkModeEnabled$ = new BehaviorSubject<boolean>(false);
}
