import {
  MigrationInterface,
  QueryRunner,
  Table,
  TableForeignKey,
} from 'typeorm';
import * as fs from 'fs';

export class PopulatePokemonTable1724775551263 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'pokemon',
        columns: [
          {
            name: 'id',
            type: 'integer',
            isPrimary: true,
            isGenerated: true,
            generationStrategy: 'increment',
          },
          {
            name: 'pokemonId',
            type: 'varchar',
          },
          {
            name: 'name',
            type: 'varchar',
          },
          {
            name: 'attack',
            type: 'integer',
          },
          {
            name: 'defense',
            type: 'integer',
          },
          {
            name: 'hp',
            type: 'integer',
          },
          {
            name: 'speed',
            type: 'integer',
          },
          {
            name: 'type',
            type: 'varchar',
          },
          {
            name: 'imageUrl',
            type: 'varchar',
          },
        ],
      }),
      true,
    );

    await queryRunner.createTable(
      new Table({
        name: 'history',
        columns: [
          {
            name: 'id',
            type: 'integer',
            isPrimary: true,
            isGenerated: true,
            generationStrategy: 'increment',
          },
          {
            name: 'winner',
            type: 'integer',
          },
          {
            name: 'pokemonOneId',
            type: 'integer',
          },
          {
            name: 'pokemonTwoId',
            type: 'integer',
          },
          {
            name: 'date',
            type: 'date',
          },
        ],
      }),
    );

    await queryRunner.createForeignKey(
      'history',
      new TableForeignKey({
        columnNames: ['pokemonOneId'],
        referencedColumnNames: ['id'],
        referencedTableName: 'pokemon',
        onDelete: 'CASCADE',
      }),
    );

    await queryRunner.createForeignKey(
      'history',
      new TableForeignKey({
        columnNames: ['pokemonTwoId'],
        referencedColumnNames: ['id'],
        referencedTableName: 'pokemon',
        onDelete: 'CASCADE',
      }),
    );

    const pokemons = JSON.parse(
      fs.readFileSync('src/migration/pokemon.json', 'utf8'),
    ).pokemon;

    for (const pokemon of pokemons) {
      await queryRunner.query(
        `INSERT INTO pokemon (pokemonId, name, attack, defense, hp, speed, type, imageUrl) VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
        [
          pokemon.id,
          pokemon.name,
          pokemon.attack,
          pokemon.defense,
          pokemon.hp,
          pokemon.speed,
          pokemon.type,
          pokemon.imageUrl,
        ],
      );
    }
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DELETE FROM pokemon`);
    await queryRunner.dropForeignKey('history', 'FK_pokemonOne');
    await queryRunner.dropForeignKey('history', 'FK_pokemonTwo');
    await queryRunner.dropTable('history');
  }
}
