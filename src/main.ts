import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
import { DocumentBuilder, SwaggerModule } from "@nestjs/swagger";

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  // Enable CORS for specific origins
  app.enableCors({
    origin: "*",
    credentials: true,
  });

  const config = new DocumentBuilder()
    .setTitle("Salni API")
    .setDescription("The backend API for the Salni app")
    .setVersion("1.0")
    .addTag("Auth", "API for authentication")
    .addTag("Users", "API for users management")
    .addTag("Deals", "API for deals and transactions")
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup("api", app, document);

  await app.listen(3000);
}
bootstrap();
