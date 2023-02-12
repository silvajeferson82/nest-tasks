import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TasksModule } from './tasks/tasks.module';
import { TypeOrmModule, TypeOrmModuleOptions } from '@nestjs/typeorm';

@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forRoot({
      type: 'sqlite',
      database: 'nestjs_tasks_dev',
      entities: [__dirname + '/**/*.entity.{js,ts}'],
      synchronize: true,
    } as TypeOrmModuleOptions),
    TasksModule,
  ],
})
export class AppModule {}
