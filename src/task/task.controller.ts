import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { ITask } from './task.interface';
import { TaskService } from './task.service';

@Controller('api')
export class TaskController {
  constructor(private taskService: TaskService) {}
  @Get()
  getTasks(): ITask[] {
    return this.taskService.getTasks();
  }

  @Get(':id')
  getTaskById(@Param('id') id: number): ITask {
    return this.taskService.getTaskById(id);
  }
  @Post()
  createTask(@Body('task') task: ITask): ITask {
    return this.taskService.createTask(task);
  }
  @Delete(':id')
  deleteTask(@Param('id') id: number): ITask {
    return this.taskService.deleteTask(id);
  }

  @Put(':id')
  updateTask(@Param('id') id: number, @Body('task') task: ITask): ITask {
    return this.taskService.updateTask(id, task);
  }
}
