import {
  Body, Controller,
  Get, Param, Post, Put
} from "@nestjs/common";
// import { JwtAuthGuard } from "src/auth/jwt-auth.guard";
import { CreateScheduleDto } from "./dto/create-schedule.dto";
import { Schedule } from "./models/schedule.interface";
import { ScheduleService } from "./schedule.service";
// import { JwtService } from "@nestjs/jwt";

@Controller("schedule")
export class ScheduleController {
  constructor(private scheduleService: ScheduleService) {}

  // @UseGuards(JwtAuthGuard)
  @Get()
  async getSchedules(): Promise<Schedule[]> {
    return await this.scheduleService.findAll();
  }

  // @UseGuards(JwtAuthGuard)
  @Post()
  async create(@Body() schedule: CreateScheduleDto): Promise<Schedule> {
    console.log(schedule);

    return await this.scheduleService.create(schedule);
  }

  // @UseGuards(JwtAuthGuard)
  @Put(":id")
  async update(
    @Param() id: string,
    @Body() schedule: CreateScheduleDto
  ): Promise<Schedule> {
    console.log(id);
    const scheduleKey = { id: id };
    return await this.scheduleService.update(scheduleKey, schedule);
  }
}
