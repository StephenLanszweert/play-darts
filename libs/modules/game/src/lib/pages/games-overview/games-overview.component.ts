import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'playdarts-games-overview',
  styleUrls: ['./games-overview.component.scss'],
  templateUrl: './games-overview.component.html',
})
export class GamesOverviewComponent implements OnInit {

  @Input() darkMode = true;

  ngOnInit(): void {
  }
}
