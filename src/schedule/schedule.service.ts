import { Injectable } from '@nestjs/common';
import { InjectModel, Model } from 'nestjs-dynamoose';
import { CoursesService } from 'src/courses/course.service';
import { Course } from 'src/courses/models/course.interface';
import { v4 as uuid } from 'uuid';
import { CreateScheduleDto } from './dto/create-schedule.dto';
import { Schedule, ScheduleKey } from './models/schedule.interface';

@Injectable()
export class ScheduleService {
  constructor(
    @InjectModel('Schedule')
    private scheduleModel: Model<Schedule, ScheduleKey>,
    private coursesService: CoursesService,
  ) {}

  async create(schedule: CreateScheduleDto) {
    schedule.id = uuid();

    const scheduled = await this.scheduleModel.create(schedule);
    const courseKey = { id: schedule.courseId };
    let { updateAt, ...course } = await this.coursesService.findOne(courseKey);
    course.slotsConfig.forEach((slot) => {
      if (slot.slotId === schedule.slotId) {
        if (slot.slotQty > 0) {
          slot.slotQty -= 1;
        }
      }
    });

    const draft: Partial<Course> = {
      slotsConfig: course.slotsConfig,
    };
    this.coursesService.update(courseKey, draft);
    return scheduled;
  }

  async update(key: ScheduleKey, user: Partial<Schedule>) {
    return this.scheduleModel.update(key, user);
  }

  async findCoursesScheduledByUserID(userId: String): Promise<Schedule[]> {
    return this.scheduleModel
      .query('userId')
      .eq(userId)
      .attributes(['courseId'])
      .exec();
  }

  async findByParam(key: string, value: string): Promise<Schedule | any> {
    let param = {
      [key]: {
        eq: value,
      },
    };
    console.log(param);

    return await this.scheduleModel.scan(param).exec();
  }

  findAll() {
    return this.scheduleModel.scan().exec();
  }
}
