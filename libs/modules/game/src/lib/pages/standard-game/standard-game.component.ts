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
    this.gameStarted = false;
    this.startPlayer = this.players[0];

    this.switchPlayer$.pipe(
      switchMap(() => this.game),
      switchMap((game) => {
        var randNum = this.randomIntFromInterval(1, 100);
        const remainingScore = game.activePlayer.sets[game.currentSet].legs[game.currentLeg].throws.at(-1)?.remainingScore ?? 501;
        console.log(remainingScore);
        game.activePlayer.sets[game.currentSet].legs[game.currentLeg].throws.push({ score: randNum, remainingScore: remainingScore - randNum });
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

  addPlayer(name: string) {
    this.players.push({ id: this.players.length + 1, name });
  }

  removePlayer(id: number) {
    this.players = this.players.filter(x => x.id !== id);
    if (this.startPlayer?.id === id) {
      this.startPlayer = this.players.length > 0 ? this.players[0] : null;
    }
  }

  startGame() {
    const gamePlayers: StandardGamePlayer[] = [];
    this.players.forEach(player => {
      gamePlayers.push(
        {
          id: player.id, player: player, setsWon: 0, sets: [
            {
              id: 1, legs: [{
                id: 1, throws: [], checkout: [], won: false, numberOfDarts: 0
              } as Leg],
              legsWon: 0
            } as Set
          ]
        }
      )
    });

    this.game.next(
      {
        id: 0,
        players: gamePlayers,
        activePlayer: gamePlayers[0],
        checkoutType: CheckoutType.Double,
        numberOfLegs: 3,
        currentSet: 0,
        currentLeg: 0,
        numberOfSets: 2,
      });
    console.log(this.game);
    this.gameStarted = true;
  }

  switchPlayer() {
    var randNum = this.randomIntFromInterval(1, 100);
    // const remainingScore = this.game.activePlayer.sets[this.game.currentSet].legs[this.game.currentLeg].throws.at(-1)?.remainingScore ?? 501;
    // this.game.activePlayer.sets[this.game.currentSet].legs[this.game.currentLeg].throws.push({ score: randNum, remainingScore: remainingScore - randNum });
    // this.game.activePlayer.sets[this.game.currentSet].legs[this.game.currentLeg].numberOfDarts += 3;
    // const activePlayerIndex = this.game.players.indexOf(this.game.activePlayer);
    // if ((activePlayerIndex + 1) === this.game.players.length) {
    //   this.game.activePlayer = this.game.players[0];
    //   return;
    // }

    // this.game.activePlayer = this.game.players[activePlayerIndex + 1];
  }

  randomIntFromInterval(min: number, max: number) { // min and max included
    return Math.floor(Math.random() * (max - min + 1) + min)
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
