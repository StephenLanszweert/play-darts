import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { getDarkMode } from 'libs/core/src/lib/state/core.selectors';
import { Observable } from 'rxjs';

@Component({
  selector: 'playdarts-dashboard',
  styleUrls: ['./dashboard.component.scss'],
  templateUrl: './dashboard.component.html',
})
export class DashboardComponent {
  basicData: any;
  basicOptions: any;
  mobile: boolean = false;

  constructor(private router: Router, private store: Store) {}

  navigateToGame() {
    this.router.navigate(['/game']);
  }
}
