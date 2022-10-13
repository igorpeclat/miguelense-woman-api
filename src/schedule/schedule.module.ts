import { Module } from '@nestjs/common';
import { ScheduleService } from './schedule.service';
import { DynamooseModule } from 'nestjs-dynamoose';
import { ScheduleSchema } from './schema/schedule.schema';
import { CoursesService } from 'src/courses/course.service';
import { CourseSchema } from 'src/courses/schema/course.schema';
import { CoursesModule } from 'src/courses/course.module';
import { ScheduleController } from './schedule.controller';

@Module({
  imports: [
    CoursesModule,
    DynamooseModule.forFeature([
      { name: 'Schedule', schema: ScheduleSchema },
      { name: 'Course', schema: CourseSchema },
    ]),
  ],
  controllers: [ScheduleController],
  providers: [ScheduleService, CoursesService],
})
export class ScheduleModule {}
