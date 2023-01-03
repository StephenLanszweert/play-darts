import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { CheckoutType, GameType, Player, StandardGame, Set, Leg, Throw } from '@playdarts/api/game';
import { getDarkMode } from 'libs/core/src/lib/state/core.selectors';
import { DeviceDetectorService } from 'ngx-device-detector';
import { Observable } from 'rxjs';

@Component({
  selector: 'playdarts-standard-game',
  styleUrls: ['./standard-game.component.scss'],
  templateUrl: './standard-game.component.html',
})
export class StandardGameComponent implements OnInit {
  darkMode$!: Observable<boolean>;
  isMobile!: boolean;
  gameStarted!: boolean;
  players!: Player[];
  startPlayer!: Player | null;

  game!: StandardGame;

  constructor(private store: Store, private deviceService: DeviceDetectorService) { }

  ngOnInit(): void {
    this.players = [
      { id: 1, name: "Atje" },
      { id: 2, name: "Otje" },
      { id: 3, name: "Dad" }
    ]
    const gamePlayers = [
      {
        id: 1, player: this.players[0], sets: [
          {
            id: 1, legs: [{
              id: 1, throws: [], checkout: [], won: false, numberOfDarts: 0
            } as Leg],
          } as Set
        ]
      },
      {
        id: 2, player: this.players[1], sets: [
          {
            id: 1, legs: [{
              id: 1, throws: [], checkout: [], won: false, numberOfDarts: 0
            } as Leg],
          } as Set
        ]
      },
      // {
      //   id: 3, player: this.players[2], sets: [
      //     {
      //       id: 1, legs: [{
      //         id: 1, throws: [], checkout: [], won: false, numberOfDarts: 0
      //       } as Leg],
      //     } as Set
      //   ]
      // },
    ];
    this.game = {
      id: 0,
      players: gamePlayers,
      activePlayer: gamePlayers[0],
      checkoutType: CheckoutType.Double,
      numberOfLegs: 3,
      currentSet: 0,
      currentLeg: 0,
      numberOfSets: 2,
      type: { id: 0, currentlyPlaying: true, name: "Standard", route: "/standardgame" } as GameType
    };
    this.isMobile = this.deviceService.isMobile();
    this.darkMode$ = this.store.select(getDarkMode);
    this.gameStarted = true;
    this.startPlayer = this.players[0];
  }

  addPlayer(name: string) {
    this.players.push({ id: this.players.length + 1, name });
  }

  removePlayer(id: number) {
    this.players = this.players.filter(x => x.id !== id);
    if (this.startPlayer?.id === id) {
      this.startPlayer = this.players.length > 0 ? this.players[0] : null;
    }
  }

  switchPlayer() {
    const activePlayerIndex = this.game.players.indexOf(this.game.activePlayer);
    if ((activePlayerIndex + 1) === this.game.players.length) {
      this.game.activePlayer = this.game.players[0];
      return;
    }

    this.game.activePlayer = this.game.players[activePlayerIndex + 1];
  }
}
