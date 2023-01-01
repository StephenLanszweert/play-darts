import { Component, Input, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { GameType } from '@playdarts/api/game';
import { getDarkMode } from 'libs/core/src/lib/state/core.selectors';
import { Observable } from 'rxjs';

@Component({
  selector: 'playdarts-games-overview',
  styleUrls: ['./games-overview.component.scss'],
  templateUrl: './games-overview.component.html',
})
export class GamesOverviewComponent implements OnInit {
  darkMode$!: Observable<boolean>;

  gameTypes!: GameType[];

  constructor(private store: Store) { }

  ngOnInit(): void {
    this.darkMode$ = this.store.select(getDarkMode);
    this.gameTypes = [
      { id: 1, name: "501", favorite: true, currentlyPlaying: true },
      { id: 2, name: "Scoring", favorite: false, currentlyPlaying: false },
      { id: 3, name: "Round the world", favorite: true, currentlyPlaying: false },
      { id: 4, name: "Scoring sheet", favorite: false, currentlyPlaying: false },
      { id: 5, name: "Bob's 27", favorite: false, currentlyPlaying: false },
      { id: 6, name: "121 checkout", favorite: false, currentlyPlaying: false },
    ]
  }

  toggleFavorite(id: number) {
    const gameType = this.gameTypes.find(x => x.id == id);
    if (gameType != null) {
      gameType.favorite = !!gameType?.favorite ? false : true;
    }
  }
}
