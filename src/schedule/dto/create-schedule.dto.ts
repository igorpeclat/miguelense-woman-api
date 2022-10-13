import { IsBoolean, IsNotEmpty, IsOptional, IsString } from "class-validator";
import { Schedule } from "../models/schedule.interface";



export class CreateScheduleDto implements Schedule{
  @IsOptional()
  id: string;

  @IsString()
  @IsNotEmpty()
  courseId: string;

  @IsString()
  @IsNotEmpty()
  userId: string;

  @IsString()
  @IsNotEmpty()
  slotId: string;

  @IsBoolean()
  isActive: boolean;

  
}
