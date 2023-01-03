import { CheckoutType } from "../enums";
import { Game } from "./game.model";
import { StandardGamePlayer } from "./standard-game-player.model";

export type StandardGame = Game & {
  players: StandardGamePlayer[];
  numberOfLegs: number;
  currentLeg: number;
  currentSet: number;
  numberOfSets: number;
  checkoutType: CheckoutType;
  activePlayer: StandardGamePlayer;
};
