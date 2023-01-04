import { Component, Input, OnInit } from '@angular/core';
import { StandardGame, Throw } from '@playdarts/api/game';
import { DeviceDetectorService } from 'ngx-device-detector';

@Component({
  selector: 'playdarts-standard-game-stats',
  styleUrls: ['./standard-game-stats.component.scss'],
  templateUrl: './standard-game-stats.component.html',
})
export class StandardGameStatsComponent implements OnInit {
  isMobile!: boolean;
  latestThrows!: Throw[];
  @Input() darkMode: boolean | null = true;
  @Input() game!: StandardGame | null;

  constructor(private deviceService: DeviceDetectorService) { }

  ngOnInit(): void {
    this.isMobile = this.deviceService.isMobile();
  }
}
