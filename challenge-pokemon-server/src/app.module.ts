import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PokemonsModule } from './pokemons/pokemons.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppDataSource } from './data-source';
import { HistoryModule } from './history/history.module';

@Module({
  imports: [TypeOrmModule.forRoot(AppDataSource.options), PokemonsModule, HistoryModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
