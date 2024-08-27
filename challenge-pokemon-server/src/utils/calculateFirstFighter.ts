import { IPokemon } from 'src/pokemons/interfaces/pokemon.interfaces';

const calculateFirstFighter = (
  pokemonOne: IPokemon,
  pokemonTwo: IPokemon,
): IPokemon[] => {
  if (pokemonOne.speed === pokemonTwo.speed) {
    return pokemonOne.attack >= pokemonTwo.attack
      ? [pokemonOne, pokemonTwo]
      : [pokemonTwo, pokemonOne];
  }

  return pokemonOne.speed > pokemonTwo.speed
    ? [pokemonOne, pokemonTwo]
    : [pokemonTwo, pokemonOne];
};

export default calculateFirstFighter;
