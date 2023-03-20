import { Controller, Get } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { MovementService } from 'src/movements/services/movement/movement.service';

@ApiTags('logs')
@Controller('movement')
export class MovementController {
  constructor(private readonly movementService: MovementService) {}

  @Get()
  async getLogs() {
    return await this.movementService.getLogs();
  }
}
