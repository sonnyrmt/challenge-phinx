import { Controller, Get, Param, ParseIntPipe } from '@nestjs/common';
import { HistoryService } from './history.service';

@Controller('history')
export class HistoryController {
  constructor(private historyService: HistoryService) {}

  @Get()
  getHistory() {
    return this.historyService.getAllHistory();
  }

  @Get(':id')
  getHistoryById(@Param('id', ParseIntPipe) id: number) {
    return this.historyService.getHistoryById(id);
  }
}
