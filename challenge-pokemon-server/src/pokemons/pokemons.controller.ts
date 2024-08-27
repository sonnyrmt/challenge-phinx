import { Controller, Get, Post, Body } from '@nestjs/common';
import { PokemonsService } from './pokemons.service';
import { IBattleRequest } from './interfaces/pokemon.interfaces';

@Controller('pokemons')
export class PokemonsController {
  constructor(private pokemonService: PokemonsService) {}

  @Get()
  getPokemons() {
    return this.pokemonService.getPokemons();
  }

  @Post()
  async pokemonBattle(@Body() data: IBattleRequest) {
    return await this.pokemonService.battle(data);
  }
}
