import { ITask } from './task.interface';

export class Task implements ITask {
  id: number;
  title: string;
  constructor(task: string) {
    this.title = task;
    this.id = new Date().getTime();
  }
}
