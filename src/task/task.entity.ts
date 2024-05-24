import { ITask, Status } from './task.interface';

export class Task implements ITask {
  id = new Date().getTime();
  title: string;
  text: string;
  status: Status = Status.CREATED;
  tags: string[] = [];
  createdAt: Date = new Date();
  updatedAt: Date = new Date();

  constructor(title: string, text: string, tags?: string[], status?: Status) {
    this.title = title;
    this.text = text;
    this.tags = tags || [];
    this.status = status || Status.CREATED;
  }
}
