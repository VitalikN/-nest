import { Injectable, NotFoundException } from '@nestjs/common';
import { ITask } from './task.interface';

@Injectable()
export class TaskService {
  private tasks: ITask[] = [
    { id: 1, title: 'Task 1' },
    { id: 2, title: 'Task 2' },
  ];
  getTasks(): ITask[] {
    return this.tasks;
  }
  getTaskById(id: number): ITask {
    const task = this.tasks.find((t) => t.id === +id);
    return task;
  }
  createTask(task: ITask): ITask {
    this.tasks.push(task);
    return task;
  }
  deleteTask(id: number): ITask {
    const taskIndex = this.tasks.findIndex((t) => t.id === +id);
    if (taskIndex === -1) {
      throw new NotFoundException('Task not found');
    }
    const deletedTask = this.tasks.splice(taskIndex, 1)[0];
    return deletedTask;
  }

  updateTask(id: number, task: ITask): ITask {
    const taskIndex = this.tasks.findIndex((t) => t.id === +id);
    if (taskIndex === -1) {
      throw new NotFoundException('Task not found');
    }
    this.tasks[taskIndex] = task;
    return task;
  }
}
