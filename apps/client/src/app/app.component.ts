import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { getDarkMode } from 'libs/core/src/lib/state/core.selectors';
import { BehaviorSubject, filter, map, Observable, Subject } from 'rxjs';

@Component({
  selector: 'playdarts-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  title = 'client';
  darkMode$!: Observable<boolean>;
  sidebarExpanded$ = new BehaviorSubject<boolean>(true);

  constructor(private store: Store) { }

  ngOnInit(): void {
    this.darkMode$ = this.store.select(getDarkMode);
  }
}
