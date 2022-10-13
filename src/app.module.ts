import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { DynamooseModule } from 'nestjs-dynamoose';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { CategoryModule } from './category/category.module';
import { configValidationSchema } from './config/config.schema';
import { CoursesModule } from './courses/course.module';
import { ScheduleModule } from './schedule/schedule.module';
import { UsersModule } from './users/users.module';

@Module({
  imports: [
    AuthModule,
    UsersModule,
    CoursesModule,
    ScheduleModule,
    CategoryModule,
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: [`./src/config/.env.${process.env.STAGE}`],
      validationSchema: configValidationSchema,
      cache: true,
    }),
    DynamooseModule.forRoot({
      aws: {
        accessKeyId: process.env.AWS_ACCESS_KEY_ID,
        secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
        region: process.env.AWS_REGION,
      },
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
