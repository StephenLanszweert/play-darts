import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'playdarts-dashboard',
  styleUrls: ['./dashboard.component.scss'],
  templateUrl: './dashboard.component.html',
})
export class DashboardComponent implements OnInit {
  basicData: any;
  basicOptions: any;
  mobile: boolean = false;

  @Input() darkMode = false;

  ngOnInit(): void {
  }
}
