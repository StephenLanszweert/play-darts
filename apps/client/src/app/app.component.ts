import { Component, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { getDarkMode } from 'libs/core/src/lib/state/core.selectors';
import {
  BehaviorSubject,
  filter,
  map,
  Observable,
  startWith,
  Subject,
  takeUntil,
} from 'rxjs';

@Component({
  selector: 'playdarts-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit, OnDestroy {
  title = 'client';
  destroy$ = new Subject<void>();
  darkMode$!: Observable<boolean>;
  sidebarExpanded$ = new BehaviorSubject<boolean>(true);

  constructor(private store: Store) {}

  ngOnInit(): void {
    document.body.classList.add('dark');
    this.store
      .select(getDarkMode)
      .pipe(takeUntil(this.destroy$))
      .subscribe((value) => {
        if (!!value) {
          document.body.classList.add('dark');
          document.body.classList.remove('light');
        } else {
          document.body.classList.add('light');
          document.body.classList.remove('dark');
        }
      });
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
