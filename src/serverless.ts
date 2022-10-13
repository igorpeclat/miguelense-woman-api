import { ValidationPipe } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { NestFactory } from "@nestjs/core";
import serverlessExpress from "@vendia/serverless-express";
import { Callback, Context, Handler } from "aws-lambda";
// import cookieParser from "cookie-parser";
// import { TransformInterceptor } from "./app-interceptors/transform.interceptor";
import { AppModule } from "./app.module";

let server: Handler;

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const configService = app.get(ConfigService);
  const appGlobalPrefix = configService.get<string>("APP_GLOBAL_PREFIX", "");
  const appPort = configService.get<number>("APP_PORT", 3000);
  app.setGlobalPrefix(appGlobalPrefix);

  app.useGlobalPipes(new ValidationPipe());
  // app.useGlobalInterceptors(new TransformInterceptor());
  // app.use(cookieParser());
  await app.listen(appPort);
  await app.init();

  const expressApp = app.getHttpAdapter().getInstance();
  return serverlessExpress({ app: expressApp });
}

export const handler: Handler = async (
  event: any,
  context: Context,
  callback: Callback
) => {
  server = server ?? (await bootstrap());
  return server(event, context, callback);
};
