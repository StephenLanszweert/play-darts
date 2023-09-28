import {
  Component,
  HostListener,
  Inject,
  OnDestroy,
  OnInit,
} from '@angular/core';
import { Store } from '@ngrx/store';
import {
  CheckoutType,
  GameType,
  Player,
  StandardGame,
  Set,
  Leg,
  Throw,
  StandardGamePlayer,
  FinishService,
  StandardGameOutshotType,
  StandardGameService,
} from '@playdarts/api/game';
import { getDarkMode } from 'libs/core/src/lib/state/core.selectors';
import { DeviceDetectorService } from 'ngx-device-detector';
import {
  BehaviorSubject,
  map,
  Observable,
  of,
  Subject,
  switchMap,
  takeUntil,
  tap,
  withLatestFrom,
} from 'rxjs';

@Component({
  selector: 'playdarts-standard-game',
  styleUrls: ['./standard-game.component.scss'],
  templateUrl: './standard-game.component.html',
})
export class StandardGameComponent implements OnInit, OnDestroy {
  destroy$ = new Subject<void>();
  isMobile!: boolean;
  gameStarted!: boolean;
  players!: Player[];
  startPlayer!: Player | null;
  showOutshot: boolean = false;
  outshotNumber: number = 0;

  game$!: Observable<StandardGame>;
  switchPlayer$ = new Subject<void>();
  addScore$ = new Subject<number>();
  undo$ = new Subject<void>();

  constructor(
    private store: Store,
    private deviceService: DeviceDetectorService,
    private gameService: StandardGameService
  ) {}

  ngOnInit(): void {
    this.players = [
      { id: 1, name: 'Atje' },
      { id: 2, name: 'Otje' },
    ];
    this.isMobile = this.deviceService.isMobile();
    this.startPlayer = this.players[1];

    this.game$ = this.gameService.game$;
    this.startGame();

    this.switchPlayer$
      .pipe(
        switchMap(() => this.game$),
        takeUntil(this.destroy$)
      )
      .subscribe((game) => {
        const activePlayerIndex = game.players.indexOf(game.activePlayer);
        if (activePlayerIndex + 1 === game.players.length) {
          game.activePlayer = game.players[0];
        } else {
          game.activePlayer = game.players[activePlayerIndex + 1];
        }
      });

    this.addScore$
      .pipe(withLatestFrom(this.game$), takeUntil(this.destroy$))
      .subscribe(([score, game]) => {
        const remainingScore =
          game.activePlayer.sets[game.currentSet].legs[game.currentLeg]
            .throws[0]?.remainingScore ?? 501;
        const newRemainingScore = remainingScore - score;
        console.log('Remaining score: ', newRemainingScore);
        if (newRemainingScore === 1) return;

        game.activePlayer.sets[game.currentSet].legs[
          game.currentLeg
        ].throws.unshift({ score, remainingScore: newRemainingScore });
        if (remainingScore < 180) {
          this.showOutshot = true;
          this.outshotNumber = remainingScore;
          return;
        }
        game.activePlayer.sets[game.currentSet].legs[
          game.currentLeg
        ].numberOfDarts += 3;
        this.switchPlayer$.next();
      });

    this.undo$
      .pipe(
        tap(() => this.switchPlayer$.next()),
        withLatestFrom(this.game$),
        takeUntil(this.destroy$)
      )
      .subscribe(([, game]) => {
        game.activePlayer.sets[game.currentSet].legs[
          game.currentLeg
        ].throws.shift();
        game.activePlayer.sets[game.currentSet].legs[
          game.currentLeg
        ].numberOfDarts -= 3;
      });
  }

  startGame() {
    this.gameService.startNewGame(
      this.players,
      this.startPlayer ?? this.players[0]
    );
    this.gameStarted = true;
  }

  stopGame() {
    this.gameStarted = false;
  }

  ngOnDestroy() {
    alert('KKk');
    this.destroy$.next();
    this.destroy$.complete();
  }
}
