import { Component, Input, OnInit } from '@angular/core';
import { FinishService, StandardGame, StandardGameOutshot, StandardGameService } from '@playdarts/api/game';
import { DeviceDetectorService } from 'ngx-device-detector';
import { Observable } from 'rxjs';

@Component({
  selector: 'playdarts-standard-game-counters',
  styleUrls: ['./standard-game-counters.component.scss'],
  templateUrl: './standard-game-counters.component.html',
})
export class StandardGameCountersComponent implements OnInit {
  isMobile: boolean;
  leftPlayer$: Observable<any>;
  rightPlayer$: Observable<any>;
  activePlayer$: Observable<any>;

  @Input() game: StandardGame;
  @Input() darkMode: boolean | null = true;

  constructor(
    private deviceService: DeviceDetectorService,
    private finishService: FinishService,
    private gameService: StandardGameService) { }

  ngOnInit(): void {
    this.isMobile = this.deviceService.isMobile();
    if (this.game.players.length > 2) {
      this.leftPlayer$ = this.gameService.getCurrentPlayerDetails(0);
      this.leftPlayer$ = this.gameService.getCurrentPlayerDetails(1);
    } else {
      this.activePlayer$ = this.gameService.getCurrentPlayerDetails(this.game.activePlayer.id);
    }
  }

  getOutshot(remainingScore: number): string {
    return this.finishService.getOutshot(remainingScore)?.outshot ?? '';
  }
}
