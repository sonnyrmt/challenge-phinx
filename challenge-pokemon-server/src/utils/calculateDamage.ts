import { IPokemon } from 'src/pokemons/interfaces/pokemon.interfaces';

type PokemonType = 'normal' | 'fire' | 'water' | 'electric' | 'grass';

const typeDamages: Record<PokemonType, Record<PokemonType, number>> = {
  normal: { normal: 1, fire: 1, water: 1, electric: 1, grass: 1 },
  fire: { normal: 1, fire: 0.5, water: 0.5, electric: 1, grass: 2 },
  water: { normal: 1, fire: 2, water: 0.5, electric: 1, grass: 0.5 },
  electric: { normal: 1, fire: 1, water: 2, electric: 0.5, grass: 0.5 },
  grass: { normal: 1, fire: 0.5, water: 2, electric: 1, grass: 0.5 },
};

const calculateDamage = (attacker: IPokemon, defender: IPokemon) => {
  const typeDamage = typeDamages[attacker.type][defender.type];
  const baseDamage = Math.max(1, attacker.attack - defender.defense);
  return baseDamage * typeDamage;
};

export default calculateDamage;
