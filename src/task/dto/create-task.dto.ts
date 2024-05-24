import {
  ArrayNotEmpty,
  IsEnum,
  IsNotEmpty,
  IsOptional,
  IsString,
} from 'class-validator';
import { Status } from '../task.interface';

export class CreateTaskDto {
  @IsString({ message: ' title обов`язкове поле ' })
  @IsNotEmpty({ message: ' title обов`язкове поле ' })
  title: string;

  @IsString({ message: ' text обов`язкове поле ' })
  @IsNotEmpty({ message: 'text обов`язкове поле ' })
  text: string;

  @ArrayNotEmpty({ message: ' tags обов`язкове поле ' })
  @IsString({
    each: true,
    message: ' tags повинен бути  string ',
  })
  tags: string[];

  @IsOptional()
  @IsEnum(Status, { message: 'не правильний status ' })
  status: Status;
}
