export interface IBattleRequest {
  pokemonOne: IPokemon;
  pokemonTwo: IPokemon;
}

export interface IPokemon {
  id: number;
  pokemonId: string;
  name: string;
  attack: number;
  defense: number;
  hp: number;
  speed: number;
  type: string;
  imageUrl?: string;
  maxHp?: number;
}
