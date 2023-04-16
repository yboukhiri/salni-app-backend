import { ConfigService } from "@nestjs/config";
import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const configService = app.get(ConfigService);
  // Enable CORS for specific origins
  app.enableCors({
    origin: configService.get<string>("ALLOWED_ORIGINS").split(","),
    credentials: true,
  });
  await app.listen(3000);
}
bootstrap();
