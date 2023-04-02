import { Injectable } from "@angular/core";
import { Set, Leg, Player, StandardGame, StandardGameOutshot, StandardGamePlayer } from "../models";
import { BehaviorSubject, Observable, map, of } from "rxjs";
import { CheckoutType } from "../enums";

@Injectable({
  providedIn: 'root',
})
export class StandardGameService {

  game$ = new BehaviorSubject<StandardGame>({} as StandardGame);

  constructor() {
  }

  getGame(): Observable<StandardGame> {
    return this.game$;
  }

  startNewGame(players: Player[], startPlayer: Player) {
    const gamePlayers: StandardGamePlayer[] = players.map(player => ({
      id: player.id, player: player, setsWon: 0, sets: [
        {
          id: 1, legs: [{
            id: 1, throws: [], checkout: null, won: false, numberOfDarts: 0
          } as Leg],
          legsWon: 0
        } as Set
      ]
    }));
    this.game$.next(
      {
        id: 0,
        players: gamePlayers,
        activePlayer: gamePlayers.find(x => x.id === startPlayer?.id) ?? gamePlayers[0],
        checkoutType: CheckoutType.Double,
        numberOfLegs: 3,
        currentSet: 0,
        currentLeg: 0,
        numberOfSets: 2,
      });
  }

  getCurrentPlayerDetails(playerId: number): Observable<any> {
    return this.game$.pipe(
        map(() => of({}))
    );
  }
}
