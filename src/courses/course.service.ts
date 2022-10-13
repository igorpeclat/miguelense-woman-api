import { Injectable } from '@nestjs/common';
import { InjectModel, Model } from 'nestjs-dynamoose';
import { v4 as uuid } from 'uuid';
import { CreateCourseDto } from './dto/create-couse.dto';
import { Course, CourseKey } from './models/course.interface';

@Injectable()
export class CoursesService {
  constructor(
    @InjectModel('Course')
    private courseModel: Model<Course, CourseKey>,
  ) {}

  async create(course: CreateCourseDto) {
    course.id = uuid();
    const userObj = {
      id: uuid(),
      ...course,
    };
    userObj.slotsConfig.forEach((slot) => {
      slot.slotId = uuid();
    });

    return this.courseModel.create(userObj);
  }

  async update(key: CourseKey, user: Partial<Course>) {
    return this.courseModel.update(key, user);
  }

  async findOne(key: CourseKey) {
    return this.courseModel.get(key);
  }

  // async findAllWithSlotConfigNotFull() {
  //   return this.courseModel.query("slotsConfig").;
  // }

  async findCourseNotScheduled(courseIds: String[]) {
    // this.scheduleService.findSchedulesByUserId(userId);
    // .query("id").not().eq(scheduledIds)
    // this.courseModel.query().filter(` AND NOT(#id IN (${courseIds.join(',')}))`).exec()
    // return this.courseModel.query("id").not().eq(courseIds).exec();
    return this.courseModel
      .scan(`NOT(#id IN (${courseIds.join(',')}))`)
      .all()
      .exec();
  }

  async findAll() {
    return this.courseModel.scan().where('isActive').eq(true).exec();
  }
}
