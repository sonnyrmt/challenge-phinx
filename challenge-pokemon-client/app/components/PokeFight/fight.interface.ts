import IPokemon from "@/app/interfaces/pokemon.interface";
import { Dispatch, SetStateAction } from "react";

export interface Props {
  firstPosition: IPokemon;
  secondPosition: IPokemon;
  isLoading: boolean;
  allPokemons: IPokemon[];
  inBattle: boolean;
  setInBattle: Dispatch<SetStateAction<boolean>>;
}

export interface SimulationStep {
  [key: string]: IPokemon;
}

export interface BattleResponse {
  simulation: SimulationStep[];
  winner: IPokemon;
}

export interface PokemonState {
  attacker: IPokemon | null;
  defender: IPokemon | null;
}

export interface BattleInfo {
  inBattle?: boolean;
  turn?: number;
  winner?: IPokemon;
}
