import { Player } from "./player.model";

export type StandardGamePlayer = {
  id: number;
  player: Player;
  sets: Set[];
};

export type Set = {
  id: number;
  legs: Leg[];
  won: boolean;
}

export type Leg = {
  id: number;
  throws: Throw[];
  checkout: Checkout[];
  won: boolean;
  numberOfDarts: number;
}

export type Throw = {
  score: number;
  remainingScore: number;
}

export type Checkout = {
  finished: boolean;
  number: number;
  double: number;
}
