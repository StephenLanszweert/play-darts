import { Component, Input, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Player, StandardGame } from '@playdarts/api/game';
import { getDarkMode } from 'libs/core/src/lib/state/core.selectors';
import { DeviceDetectorService } from 'ngx-device-detector';
import { Observable } from 'rxjs';

@Component({
  selector: 'playdarts-standard-game-stats',
  styleUrls: ['./standard-game-stats.component.scss'],
  templateUrl: './standard-game-stats.component.html',
})
export class StandardGameStatsComponent implements OnInit {
  isMobile!: boolean;
  @Input() game!: StandardGame | null;
  @Input() darkMode: boolean | null = true;

  constructor(private deviceService: DeviceDetectorService) { }

  ngOnInit(): void {
    this.isMobile = this.deviceService.isMobile();
  }
}
