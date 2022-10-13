import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Put,
  Request,
  UseGuards,
} from '@nestjs/common';
import { CoursesService } from './course.service';
// import { CreateUserDto } from "./dto/create-users.dto";
// import { JwtAuthGuard } from "src/auth/jwt-auth.guard";
import { ScheduleService } from 'src/schedule/schedule.service';
import { CreateCourseDto } from './dto/create-couse.dto';
import { Course, CourseKey } from './models/course.interface';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
// import { JwtService } from "@nestjs/jwt";

@Controller('courses')
// @UseGuards(AuthGuard())
export class CoursesController {
  constructor(
    private coursesService: CoursesService,
    private scheduleService: ScheduleService,
  ) {}

  @UseGuards(JwtAuthGuard)
  @Get()
  async getCourses(@Request() req: any): Promise<Course[]> {
    let notInCourses;
    if (req.user) {
      const schedules = await this.scheduleService.findCoursesScheduledByUserID(
        req.user.userId,
      );
      notInCourses = schedules
        .map((schedule) => schedule.courseId)
        .filter((value, index, self) => self.indexOf(value) === index);
    }

    let courses: Course[] = await this.coursesService.findAll();
    let coursesWithSlotAvailiable =
      courses.length > 0
        ? courses.filter((c) => c.slotsConfig.some((s) => s.slotQty > 0))
        : courses;

    return coursesWithSlotAvailiable.filter(
      (c) => !notInCourses.includes(c.id),
    );
  }

  // @UseGuards(JwtAuthGuard)
  @Get(':id')
  async getCourseById(@Param() id: CourseKey): Promise<Course> {
    // const courseKey = id;
    return await this.coursesService.findOne(id);
  }

  // @UseGuards(JwtAuthGuard)
  @Post()
  async create(@Body() course: CreateCourseDto): Promise<Course> {
    console.log(course);

    return await this.coursesService.create(course);
  }

  // @UseGuards(JwtAuthGuard)
  @Put(':id')
  async update(
    @Param() id: string,
    @Body() course: CreateCourseDto,
  ): Promise<Course> {
    console.log(id);
    const courseKey = { id: id };
    return await this.coursesService.update(courseKey, course);
  }
}
