import { Module } from '@nestjs/common';
import { CoursesService } from './course.service';
import { DynamooseModule } from 'nestjs-dynamoose';
import { CourseSchema } from './schema/course.schema';
import { JwtService } from '@nestjs/jwt';
import { CoursesController } from './course.controller';
import { ScheduleService } from 'src/schedule/schedule.service';
import { ScheduleSchema } from 'src/schedule/schema/schedule.schema';

@Module({
  imports: [
    DynamooseModule.forFeature([
      { name: 'Course', schema: CourseSchema },
      { name: 'Schedule', schema: ScheduleSchema },
    ]),
  ],
  controllers: [CoursesController],
  providers: [CoursesService, JwtService, ScheduleService],
})
export class CoursesModule {}
