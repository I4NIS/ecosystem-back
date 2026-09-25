import {
  Body,
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
} from '@nestjs/common';
import {
  ApiCreatedResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';
import { CreateTaskDto } from './dto/create-task.dto.js';
import { UpdateTaskDto } from './dto/update-task.dto.js';
import { Task } from './task.entity.js';
import { TasksService } from './tasks.service.js';

@ApiTags('tasks')
@Controller('tasks')
export class TasksController {
  constructor(private readonly tasksService: TasksService) {}

  @Get()
  @ApiOperation({ summary: 'Lister toutes les tâches' })
  @ApiOkResponse({ type: [Task] })
  findAll(): Task[] {
    return this.tasksService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Récupérer une tâche par id' })
  @ApiOkResponse({ type: Task })
  @ApiNotFoundResponse({ description: 'Tâche introuvable' })
  findOne(@Param('id', ParseIntPipe) id: number): Task {
    return this.tasksService.findOne(id);
  }

  @Post()
  @ApiOperation({ summary: 'Créer une tâche' })
  @ApiCreatedResponse({ type: Task })
  create(@Body() dto: CreateTaskDto): Task {
    return this.tasksService.create(dto);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Marquer une tâche comme faite / à faire' })
  @ApiOkResponse({ type: Task })
  @ApiNotFoundResponse({ description: 'Tâche introuvable' })
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() dto: UpdateTaskDto,
  ): Task {
    return this.tasksService.update(id, dto);
  }
}
