import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { ITask } from './task.interface';
import { TaskService } from './task.service';
import { CreateTaskDto } from './dto/create-task.dto';

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
  @UsePipes(new ValidationPipe())
  @Post()
  createTask(@Body() task: CreateTaskDto): ITask {
    return this.taskService.createTask(task);
  }
  @Delete(':id')
  deleteTask(@Param('id') id: number): ITask {
    return this.taskService.deleteTask(id);
  }
  @UsePipes(new ValidationPipe())
  @Put(':id')
  updateTask(@Param('id') id: number, @Body() task: CreateTaskDto): ITask {
    return this.taskService.updateTask(id, task);
  }
}
