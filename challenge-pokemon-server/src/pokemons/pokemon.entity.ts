import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class Pokemon {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  pokemonId: string;

  @Column()
  name: string;

  @Column()
  attack: number;

  @Column()
  defense: number;

  @Column()
  hp: number;

  @Column()
  speed: number;

  @Column()
  type: string;

  @Column()
  imageUrl: string;
}
