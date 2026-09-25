import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication, ValidationPipe } from '@nestjs/common';
import request from 'supertest';
import { App } from 'supertest/types';
import { AppModule } from './../src/app.module.js';

describe('TasksController (e2e)', () => {
  let app: INestApplication<App>;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    app.useGlobalPipes(
      new ValidationPipe({ whitelist: true, transform: true }),
    );
    await app.init();
  });

  it('GET /tasks', () => {
    return request(app.getHttpServer()).get('/tasks').expect(200);
  });

  it('POST /tasks then GET /tasks/:id then PATCH /tasks/:id', async () => {
    const created = await request(app.getHttpServer())
      .post('/tasks')
      .send({ title: 'Test' })
      .expect(201);
    const id = created.body.id;

    await request(app.getHttpServer()).get(`/tasks/${id}`).expect(200);

    const updated = await request(app.getHttpServer())
      .patch(`/tasks/${id}`)
      .send({ done: true })
      .expect(200);
    expect(updated.body.done).toBe(true);
  });

  it('POST /tasks rejects an empty title', () => {
    return request(app.getHttpServer())
      .post('/tasks')
      .send({ title: '' })
      .expect(400);
  });

  it('GET /tasks/:id returns 404 for unknown id', () => {
    return request(app.getHttpServer()).get('/tasks/999').expect(404);
  });

  afterEach(async () => {
    await app.close();
  });
});
