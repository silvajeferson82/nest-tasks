import { Module } from '@nestjs/common';
import { TasksController } from './tasks.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TasksRepository } from './repositories/task.reporitory';

@Module({
  imports: [TypeOrmModule.forFeature([])],
  providers: [TasksRepository],
  controllers: [TasksController],
})
export class TasksModule {}
