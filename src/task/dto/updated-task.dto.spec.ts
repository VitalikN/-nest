import { TaskService } from '../task.service';
import { Status } from '../task.interface';
import { NotFoundException } from '@nestjs/common';
import { plainToInstance } from 'class-transformer';
import { CreateTaskDto } from './create-task.dto';
import { validate } from 'class-validator';

describe('TaskService updateTask', () => {
  let taskService: TaskService;
  let dto;
  beforeEach(() => {
    taskService = new TaskService();
    dto = {
      title: 'Initial Title',
      text: 'Initial Text',
      tags: ['Initial Tag'],
      status: Status.CREATED,
    };
  });
  it('should update task successfully', () => {
    const newTask = taskService.createTask(dto);
    dto.title = 'Updated Title';
    dto.text = 'Updated Text';
    dto.tags = ['Updated Tag'];
    dto.status = Status.DONE;

    const updatedTask = taskService.updateTask(newTask.id, dto);
    expect(updatedTask.title).toBe('Updated Title');
    expect(updatedTask.text).toBe('Updated Text');
    expect(updatedTask.tags).toEqual(['Updated Tag']);
    expect(updatedTask.status).toBe(Status.DONE);
  });
  it('should throw NotFoundException for non-existing task', () => {
    expect(() => taskService.updateTask(999, dto)).toThrow(NotFoundException);
  });
  it('should validate the dto', async () => {
    dto.title = '';
    const ofImportDto = plainToInstance(CreateTaskDto, dto);
    const errors = await validate(ofImportDto);

    expect(errors.map((err) => err.property).includes('title')).toBeTruthy();
  });
});
