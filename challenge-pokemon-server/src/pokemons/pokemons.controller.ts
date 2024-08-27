import { Controller, Get } from '@nestjs/common';
import { PokemonsService } from './pokemons.service';

@Controller('pokemons')
export class PokemonsController {
  constructor(private pokemonService: PokemonsService) {}

  @Get()
  getPokemons() {
    return this.pokemonService.getPokemons();
  }
}
