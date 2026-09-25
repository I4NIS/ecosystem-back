import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean } from 'class-validator';

export class UpdateTaskDto {
  @ApiProperty({ example: true })
  @IsBoolean()
  done: boolean;
}
