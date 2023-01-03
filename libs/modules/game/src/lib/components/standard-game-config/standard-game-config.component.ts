import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Player } from '@playdarts/api/game';
import { getDarkMode } from 'libs/core/src/lib/state/core.selectors';
import { Observable } from 'rxjs';

@Component({
  selector: 'playdarts-standard-game-config',
  styleUrls: ['./standard-game-config.component.scss'],
  templateUrl: './standard-game-config.component.html',
})
export class StandardGameConfigComponent implements OnInit {
  darkMode$!: Observable<boolean>;

  gameStarted!: boolean;
  players!: Player[];
  startPlayer!: Player | null;

  constructor(private store: Store) { }

  ngOnInit(): void {
    this.darkMode$ = this.store.select(getDarkMode);
    this.gameStarted = false;
    this.players = [
      { id: 1, name: "Atje" },
      { id: 2, name: "Otje" }
    ]
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
}
