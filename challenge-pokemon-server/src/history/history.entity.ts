import { Pokemon } from '../pokemons/pokemon.entity';
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';

@Entity()
export class History {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  winner: number;

  @ManyToOne(() => Pokemon)
  pokemonOne: Pokemon;

  @ManyToOne(() => Pokemon)
  pokemonTwo: Pokemon;

  @Column('date')
  date: Date;
}
