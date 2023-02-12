import {
  Controller,
  Get,
  Post,
  Redirect,
  Param,
  Render,
  Req,
  Patch,
  Delete,
} from '@nestjs/common';
import { TasksRepository } from './repositories/task.reporitory';
import { InjectRepository } from '@nestjs/typeorm';
import { Task } from './entities/tasks.entity';
import { TaskStatus } from './tasks-status-enum';
import { Request, request } from 'express';

@Controller('tasks')
export class TasksController {
  constructor(
    @InjectRepository(TasksRepository)
    private tasksRepository: TasksRepository,
  ) {}

  @Get('/home')
  @Render('home')
  root() {
    //
  }

  @Get('/index')
  @Render('index')
  async index() {
    return await this.tasksRepository
      .getTasks()
      .then((tasks) => ({ tasks: tasks }));
  }

  @Get('create')
  @Render('create')
  create(): void {
    //
  }

  @Get('/:id/edit')
  @Render('edit')
  async edit(@Param('id') id: string) {
    const task = await this.tasksRepository.findOneBy({ id });

    return { task: task };
  }

  @Get(':id')
  @Render('show')
  async show(@Param('id') id: string) {
    const task = await this.tasksRepository.findOneBy({ id });

    return { task: task };
  }

  @Post()
  @Redirect('/tasks/index')
  async store(@Req() request: Request) {
    const task = new Task();

    task.title = request.body['title'];
    task.description = request.body['description'];
    task.status = TaskStatus.OPEM;

    await this.tasksRepository.save(task);

    return { task: task };
  }

  @Patch('/:id')
  @Redirect('/tasks/index')
  async update(@Param('id') id: string, @Req() request: Request) {
    const task = await this.tasksRepository.findOneBy({ id });

    task.status = request.body['status'];
    task.title = request.body['title'];
    task.description = request.body['description'];

    await this.tasksRepository.save(task);

    return { task: task };
  }

  @Delete('/:id')
  @Redirect('/tasks/index')
  delete(@Param('id') id: string) {
    return this.tasksRepository.delete(id);
  }
}
