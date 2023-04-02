import { Component, EventEmitter, HostListener, Input, OnInit, Output } from '@angular/core';
import { Store } from '@ngrx/store';
import { Player, StandardGame } from '@playdarts/api/game';
import { Game } from 'libs/api/game/src/lib/models/game.model';
import { DeviceDetectorService } from 'ngx-device-detector';
import { Observable } from 'rxjs';

@Component({
  selector: 'playdarts-standard-game-actions',
  styleUrls: ['./standard-game-actions.component.scss'],
  templateUrl: './standard-game-actions.component.html',
})
export class StandardGameActionsComponent implements OnInit {
  isMobile!: boolean;

  score: string = ''

  @Input() game!: StandardGame;
  @Input() darkMode: boolean | null = true;
  @Output() undo = new EventEmitter<void>();
  @Output() scoreEntered = new EventEmitter<number>();
  @Output() stopGame = new EventEmitter<void>();

  actionNumbers!: number[];

  @HostListener('document:keydown', ['$event'])
  handleKeyboardEvent(event: KeyboardEvent) {
    const isNumber = /^[0-9]$/i.test(event.key);
    if (isNumber) {
      this.inputNumber(parseInt(event.key));
      return;
    }

    if (event.key === 'Backspace' && this.score !== '') {
      this.score = this.score.slice(0, -1);
    }

    if (event.key === 'Enter') {
      this.enterScore();
      return;
    }
  }

  constructor(private deviceService: DeviceDetectorService) { }

  ngOnInit(): void {
    this.isMobile = this.deviceService.isMobile();
    this.actionNumbers = [26, 1, 2, 3, 60, 41, 4, 5, 6, 85, 45, 7, 8, 9, 100];
  }

  inputNumber(number: number) {
    const newScore = parseInt(this.score + '' + number);
    const remainingScoreActivePlayer = this.game?.activePlayer.sets[this.game.currentSet].legs[this.game.currentLeg].throws[0]?.remainingScore ?? 501;
    if (this.score.length === 3 || newScore > 180 || (remainingScoreActivePlayer - newScore < 0)) return;
    if (number > 9) {
      if (this.score !== '') return;
      this.score = '' + number;
      this.enterScore();
      return;
    }
    this.score = `${newScore}`;
  }

  canUndo(): boolean {
    if (!this.game) return false;

    return this.game?.players.some(player => player.sets[this.game?.currentSet ?? 0].legs[this.game?.currentLeg ?? 0].throws
      .length > 0);
  }

  enterScore() {
    const scoreNumber = parseInt(this.score);
    if (scoreNumber > 180) return;
    this.scoreEntered.emit(scoreNumber);
    this.score = '';
  }
}
