import { Component, Input, OnInit } from '@angular/core';
import { StandardGame, Throw } from '@playdarts/api/game';
import { DeviceDetectorService } from 'ngx-device-detector';

@Component({
  selector: 'playdarts-standard-game-stats',
  styleUrls: ['./standard-game-stats.component.scss'],
  templateUrl: './standard-game-stats.component.html',
})
export class StandardGameStatsComponent {
  latestThrows!: Throw[];
  @Input() game!: StandardGame;
}
