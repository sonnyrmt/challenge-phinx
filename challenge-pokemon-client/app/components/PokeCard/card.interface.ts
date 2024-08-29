import IPokemon from "@/app/interfaces/pokemon.interface";
import { Dispatch, SetStateAction } from "react";

export interface Props {
  pokemon: IPokemon;
  select?: Dispatch<SetStateAction<IPokemon | undefined>>;
  isActionable?: boolean;
  statsMode?: boolean;
  withHistory?: number;
  inBattle?: boolean;
}

export const historyInitialState = {
  id: 0,
  open: false,
};
