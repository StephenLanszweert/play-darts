import { Component, Input, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { getDarkMode } from 'libs/core/src/lib/state/core.selectors';
import { Observable } from 'rxjs';

@Component({
  selector: 'playdarts-dashboard',
  styleUrls: ['./dashboard.component.scss'],
  templateUrl: './dashboard.component.html',
})
export class DashboardComponent implements OnInit {
  basicData: any;
  basicOptions: any;
  mobile: boolean = false;
  darkMode$!: Observable<boolean>;

  constructor(private store: Store) { }

  ngOnInit(): void {
    this.darkMode$ = this.store.select(getDarkMode);
  }
}
