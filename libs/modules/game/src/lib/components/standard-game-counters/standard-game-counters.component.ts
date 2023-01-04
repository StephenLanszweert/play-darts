import { Component, Input, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Player, StandardGame } from '@playdarts/api/game';
import { Game } from 'libs/api/game/src/lib/models/game.model';
import { getDarkMode } from 'libs/core/src/lib/state/core.selectors';
import { DeviceDetectorService } from 'ngx-device-detector';
import { Observable } from 'rxjs';

@Component({
  selector: 'playdarts-standard-game-counters',
  styleUrls: ['./standard-game-counters.component.scss'],
  templateUrl: './standard-game-counters.component.html',
})
export class StandardGameCountersComponent implements OnInit {
  isMobile!: boolean;

  private _game!: StandardGame | null;
  get game(): StandardGame | null {
    return this._game;
  }
  @Input() set game(value: StandardGame | null) {
    if (!value) return;
    this._game = value;
    console.log("game set");
  }

  @Input() currentSet!: StandardGame;
  @Input() darkMode: boolean | null = true;

  constructor(private deviceService: DeviceDetectorService) { }

  ngOnInit(): void {
    this.isMobile = this.deviceService.isMobile();
  }
}
