import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { History } from './history.entity';
import { Repository } from 'typeorm';

@Injectable()
export class HistoryService {
  constructor(
    @InjectRepository(History) private historyRepository: Repository<History>,
  ) {}

  getAllHistory() {
    return this.historyRepository.find({
      relations: ['pokemonOne', 'pokemonTwo'],
    });
  }
}
