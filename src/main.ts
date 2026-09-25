import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module.js';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.enableCors({
    origin: (process.env.CORS_ORIGIN ?? 'http://localhost:5173')
      .split(',')
      .map((o) => o.trim().replace(/\/$/, '')),
  });
  app.useGlobalPipes(new ValidationPipe({ whitelist: true, transform: true }));

  const config = new DocumentBuilder()
    .setTitle('Tasks API')
    .setDescription('API de gestion de tâches')
    .setVersion('1.0')
    .build();
  // Assets served from a CDN: swagger-ui-dist static files are not bundled on Vercel
  const swaggerCdn = 'https://cdn.jsdelivr.net/npm/swagger-ui-dist@5.33.0';
  SwaggerModule.setup(
    'api',
    app,
    () => SwaggerModule.createDocument(app, config),
    {
      customCssUrl: `${swaggerCdn}/swagger-ui.css`,
      customJs: [
        `${swaggerCdn}/swagger-ui-bundle.js`,
        `${swaggerCdn}/swagger-ui-standalone-preset.js`,
      ],
    },
  );

  await app.listen(process.env.PORT ?? 3000);
}
void bootstrap();
