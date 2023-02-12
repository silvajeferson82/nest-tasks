import { Injectable } from '@nestjs/common';
import { Task } from '../entities/tasks.entity';
import { DataSource, Repository } from 'typeorm';

@Injectable()
export class TasksRepository extends Repository<Task> {
  constructor(private dataSource: DataSource) {
    super(Task, dataSource.createEntityManager());
  }

  async getTasks(): Promise<Task[]> {
    const query = this.createQueryBuilder('task');

    const tasks = await query.getMany();

    return tasks;
  }
}
