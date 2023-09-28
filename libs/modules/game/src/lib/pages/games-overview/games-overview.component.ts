import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
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
  gameTypes!: GameType[];

  constructor(private store: Store, private router: Router) {}

  ngOnInit(): void {
    this.gameTypes = [
      {
        id: 1,
        name: '501',
        favorite: true,
        currentlyPlaying: false,
        route: 'standardgame',
      },
      {
        id: 2,
        name: 'Scoring',
        favorite: false,
        currentlyPlaying: false,
        route: 'standardgame',
      },
      {
        id: 3,
        name: 'Round the world',
        favorite: true,
        currentlyPlaying: false,
        route: 'standardgame',
      },
      {
        id: 4,
        name: 'Scoring sheet',
        favorite: false,
        currentlyPlaying: false,
        route: 'standardgame',
      },
      {
        id: 5,
        name: "Bob's 27",
        favorite: false,
        currentlyPlaying: false,
        route: 'standardgame',
      },
      {
        id: 6,
        name: '121 checkout',
        favorite: false,
        currentlyPlaying: false,
        route: 'standardgame',
      },
    ];
  }

  toggleFavorite(id: number) {
    const gameType = this.gameTypes.find((x) => x.id == id);
    if (gameType != null) {
      gameType.favorite = !!gameType?.favorite ? false : true;
    }
  }

  navigateToGameType(route: string) {
    this.router.navigate([`/game/${route}`]);
  }
}
