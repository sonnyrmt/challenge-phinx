import { Module } from '@nestjs/common';
import { PokemonsController } from './pokemons.controller';
import { PokemonsService } from './pokemons.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Pokemon } from './pokemon.entity';
import { History } from '../history/history.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Pokemon, History])],
  controllers: [PokemonsController],
  providers: [PokemonsService],
})
export class PokemonsModule {}
