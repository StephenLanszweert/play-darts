import { Player } from "./player.model";

export type StandardGamePlayer = {
  id: number;
  player: Player;
  sets: Set[];
  setsWon: number;
};

export type Set = {
  id: number;
  legs: Leg[];
  legsWon: number;
}

export type Leg = {
  id: number;
  throws: Throw[];
  checkout: Checkout | null;
  numberOfDarts: number;
}

export type Throw = {
  score: number;
  remainingScore: number;
}

export type Checkout = {
  number: number;
  doublesUsed: number;
  dartsUsed: number;
}
