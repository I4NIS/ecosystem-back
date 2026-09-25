import { ApiProperty } from '@nestjs/swagger';

export class Task {
  @ApiProperty({ example: 1 })
  id: number;

  @ApiProperty({ example: 'Préparer le TP' })
  title: string;

  @ApiProperty({ example: 'Backend NestJS + front', required: false })
  description?: string;

  @ApiProperty({ example: false })
  done: boolean;

  @ApiProperty({ example: '2026-09-25T12:00:00.000Z' })
  createdAt: string;
}
