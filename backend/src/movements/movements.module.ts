import { Module } from '@nestjs/common';
import { MovementController } from './controller/movement/movement.controller';
import { MovementService } from './services/movement/movement.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Movement } from 'src/typeorm/entities';

@Module({
  imports: [TypeOrmModule.forFeature([Movement])],
  controllers: [MovementController],
  providers: [MovementService],
  exports: [MovementService],
})
export class MovementsModule {}
