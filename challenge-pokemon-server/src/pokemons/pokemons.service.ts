import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Pokemon } from './pokemon.entity';
import { History } from '../history/history.entity';
import { Repository } from 'typeorm';
import { IBattleRequest } from './interfaces/pokemon.interfaces';
import calculateDamage from 'src/utils/calculateDamage';
import calculateFirstFighter from 'src/utils/calculateFirstFighter';

@Injectable()
export class PokemonsService {
  constructor(
    @InjectRepository(Pokemon) private pokemonRepository: Repository<Pokemon>,
    @InjectRepository(History) private historyRepository: Repository<History>,
  ) {}

  getPokemons() {
    return this.pokemonRepository.find();
  }

  async battle({ pokemonOne, pokemonTwo }: IBattleRequest) {
    const simulation = [];

    let [attacker, defender] = calculateFirstFighter(pokemonOne, pokemonTwo);

    let turn = 1;

    while (attacker.hp > 0 && defender.hp > 0) {
      const damage = calculateDamage(attacker.attack, defender.defense);

      const attackerClone = { ...attacker };
      const defenderClone = { ...defender };

      defenderClone.hp -= damage;

      const turnData = {
        [attacker.id]: attackerClone,
        [defender.id]: defenderClone,
        turn,
      };

      turn++;
      simulation.push(turnData);

      [attacker, defender] = [defenderClone, attackerClone];
    }

    const winner = attacker.hp > 0 ? attacker : defender;

    const newHistory = this.historyRepository.create({
      winner: winner.id,
      pokemonOne: attacker,
      pokemonTwo: defender,
      date: new Date(),
    });

    await this.historyRepository.save(newHistory);

    return { simulation, winner };
  }
}
