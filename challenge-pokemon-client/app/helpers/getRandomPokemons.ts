import IPokemon from "../interfaces/pokemon.interface";

interface ISelectedPokemons {
  attacker: IPokemon;
  defender: IPokemon;
}

const getRandomPokemons = (
  pokemons: IPokemon[],
  selected?: IPokemon
): ISelectedPokemons => {
  let shuffledPokemons = [...pokemons].sort(() => Math.random() - 0.5);

  if (selected) {
    shuffledPokemons = shuffledPokemons.filter(
      (pokemon) => pokemon.id !== selected.id
    );
  }

  return {
    attacker: selected ? selected : shuffledPokemons[0],
    defender: shuffledPokemons[1],
  };
};

export default getRandomPokemons;
