import { Injectable, NotFoundException } from '@nestjs/common';
import { ITask } from './task.interface';
import { Task } from './task.entity';
import { CreateTaskDto } from './dto/create-task.dto';

@Injectable()
export class TaskService {
  private tasks: ITask[] = [];
  getTasks(): ITask[] {
    return this.tasks;
  }
  getTaskById(id: number): ITask {
    const task = this.tasks.find((t) => t.id === +id);
    return task;
  }

  createTask({ title, text, tags, status }: CreateTaskDto): ITask {
    const newTask = new Task(title, text, tags, status);
    this.tasks.push(newTask);

    return newTask;
  }
  deleteTask(id: number): ITask {
    const taskIndex = this.tasks.findIndex((t) => t.id === +id);
    if (taskIndex === -1) {
      throw new NotFoundException('Task not found');
    }
    const deletedTask = this.tasks.splice(taskIndex, 1)[0];
    return deletedTask;
  }

  updateTask(id: number, { title, text, tags, status }: CreateTaskDto) {
    const taskIndex = this.tasks.findIndex((t) => t.id === +id);
    if (taskIndex === -1) {
      throw new NotFoundException('Task not found');
    }

    // this.tasks[taskIndex].title = title;
    // return this.tasks[taskIndex];

    const updatedTask = this.tasks[taskIndex];
    updatedTask.title = title;
    updatedTask.text = text;
    updatedTask.tags = tags;
    updatedTask.status = status;
    return updatedTask;
  }
}
