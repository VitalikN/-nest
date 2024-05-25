import { plainToInstance } from 'class-transformer';
import { CreateTaskDto } from './create-task.dto';
import { validate } from 'class-validator';
import { Status } from '../task.interface';

describe('create-task.dto', () => {
  let dto;
  beforeAll(() => {
    dto = {
      title: '',
      text: '',
      tags: [],
      status: '',
    };
  });
  it('title  пуста ', async () => {
    const ofImportDto = plainToInstance(CreateTaskDto, dto);
    const errors = await validate(ofImportDto);

    expect(errors.map((err) => err.property).includes('title')).toBeTruthy(); // .toBeTruthy() для перевірки, чи є значення істинним у контексті не пусте
  });
  it('title не пуста ', async () => {
    dto.title = 'title';
    const ofImportDto = plainToInstance(CreateTaskDto, dto);
    const errors = await validate(ofImportDto);

    expect(errors.map((err) => err.property).includes('title')).toBeFalsy();
  });
  it('text  пуста ', async () => {
    const ofImportDto = plainToInstance(CreateTaskDto, dto);
    const errors = await validate(ofImportDto);

    expect(errors.map((err) => err.property).includes('text')).toBeTruthy();
  });
  it('text не пуста ', async () => {
    dto.text = 'text';
    const ofImportDto = plainToInstance(CreateTaskDto, dto);
    const errors = await validate(ofImportDto);

    expect(errors.map((err) => err.property).includes('text')).toBeFalsy();
  });
  it('tags  пустий ', async () => {
    const ofImportDto = plainToInstance(CreateTaskDto, dto);
    const errors = await validate(ofImportDto);
    expect(errors.map((err) => err.property).includes('tags')).toBeTruthy();
    expect(dto.tags.length).toBe(0);
  });
  it('tags кожен елемент  є string і не може бути пустий []  ', async () => {
    dto.tags = ['tags', 3];
    const ofImportDto = plainToInstance(CreateTaskDto, dto);
    const errors = await validate(ofImportDto);

    expect(errors.map((err) => err.property).includes('tags')).toBeTruthy();
    expect(dto.tags.length).not.toBe(0);
    expect(dto.tags.every((el) => el === 'string')).not.toBeTruthy();
  });
  it('tags кожен елемент  є string і не може бути пустий []  ', async () => {
    dto.tags = ['tags', '3'];
    const ofImportDto = plainToInstance(CreateTaskDto, dto);
    const errors = await validate(ofImportDto);

    expect(errors.map((err) => err.property).includes('tags')).toBeFalsy();
  });
  it('тип status  є значенням enum Status ', async () => {
    dto.status = 'status';
    const ofImportDto = plainToInstance(CreateTaskDto, dto);
    const errors = await validate(ofImportDto);

    expect(errors.map((err) => err.property).includes('status')).toBeTruthy();
  });
  it('тип status  є значенням enum Status ', async () => {
    dto.status = Status.ABORTED;
    const ofImportDto = plainToInstance(CreateTaskDto, dto);
    const errors = await validate(ofImportDto);

    expect(errors.map((err) => err.property).includes('status')).toBeFalsy();
    expect(dto.status).toBe('aborted');
  });
});
