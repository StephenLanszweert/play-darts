import { Component, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { CheckoutType, GameType, Player, StandardGame, Set, Leg, Throw, StandardGamePlayer } from '@playdarts/api/game';
import { getDarkMode } from 'libs/core/src/lib/state/core.selectors';
import { DeviceDetectorService } from 'ngx-device-detector';
import { BehaviorSubject, Observable, of, Subject, switchMap, takeUntil, tap } from 'rxjs';

@Component({
  selector: 'playdarts-standard-game',
  styleUrls: ['./standard-game.component.scss'],
  templateUrl: './standard-game.component.html',
})
export class StandardGameComponent implements OnInit, OnDestroy {
  destroy$ = new Subject<void>();
  darkMode$!: Observable<boolean>;
  isMobile!: boolean;
  gameStarted!: boolean;
  players!: Player[];
  startPlayer!: Player | null;
  count = 0;

  game = new BehaviorSubject<StandardGame>({} as StandardGame);
  switchPlayer$ = new Subject<void>();

  constructor(private store: Store, private deviceService: DeviceDetectorService) { }

  ngOnInit(): void {
    this.players = [
      { id: 1, name: "Atje" },
      { id: 2, name: "Otje" },
      // { id: 3, name: "Dad" }
    ]
    this.isMobile = this.deviceService.isMobile();
    this.darkMode$ = this.store.select(getDarkMode);
    // this.gameStarted = false;
    this.startPlayer = this.players[1];

    this.startGame();

    this.switchPlayer$.pipe(
      switchMap(() => this.game),
      switchMap((game) => {
        var randNum = this.randomIntFromInterval(1, 100);
        const remainingScore = game.activePlayer.sets[game.currentSet].legs[game.currentLeg].throws[0]?.remainingScore ?? 501;
        game.activePlayer.sets[game.currentSet].legs[game.currentLeg].throws.unshift({ score: randNum, remainingScore: remainingScore - randNum });
        game.activePlayer.sets[game.currentSet].legs[game.currentLeg].numberOfDarts += 3;
        const activePlayerIndex = game.players.indexOf(game.activePlayer);
        if ((activePlayerIndex + 1) === game.players.length) {
          game.activePlayer = game.players[0];
          return of(game);
        }

        game.activePlayer = game.players[activePlayerIndex + 1];

        return of(game)
      }),
      takeUntil(this.destroy$)
    ).subscribe();
  }

  startGame() {
    const gamePlayers: StandardGamePlayer[] = this.players.map(player => ({
      id: player.id, player: player, setsWon: 0, sets: [
        {
          id: 1, legs: [{
            id: 1, throws: [], checkout: [], won: false, numberOfDarts: 0
          } as Leg],
          legsWon: 0
        } as Set
      ]
    }));
    this.game.next(
      {
        id: 0,
        players: gamePlayers,
        activePlayer: gamePlayers.find(x => x.id === this.startPlayer?.id) ?? gamePlayers[0],
        checkoutType: CheckoutType.Double,
        numberOfLegs: 3,
        currentSet: 0,
        currentLeg: 0,
        numberOfSets: 2,
      });
    this.gameStarted = true;
  }

  randomIntFromInterval(min: number, max: number) { // min and max included
    return Math.floor(Math.random() * (max - min + 1) + min)
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
