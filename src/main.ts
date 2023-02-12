import { NestFactory } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';
import { join } from 'path';
import { AppModule } from './app.module';
import * as hbs from 'hbs';
import * as methodOverride from 'method-override';

async function bootstrap() {
  const port = process.env.port || 3000;
  const app = await NestFactory.create<NestExpressApplication>(AppModule);

  app.setBaseViewsDir(join(__dirname, '..', 'views'));
  app.setViewEngine('hbs');
  hbs.registerPartials(join(__dirname, '..', 'views/partials'));

  app.use(methodOverride('_method'));

  await app.listen(port, () => {
    console.log(`Exemple App listening at http://localhost:${port}`);
  });
}
bootstrap();
