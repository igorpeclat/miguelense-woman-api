import { Type } from "class-transformer";
import {
  IsArray,
  IsBoolean,
  IsDate,
  IsNotEmpty,
  IsNumber,
  IsNumberString,
  IsOptional,
  IsString,
} from "class-validator";
import { Course, SlotConfig } from "../models/course.interface";

export class SlotConfigDto implements SlotConfig {
  @IsString()
  @IsNotEmpty()
  slotId: string;

  @IsNumberString()
  @IsNotEmpty()
  slotQty: number;

  @Type(() => Date)
  @IsNotEmpty()
  @IsDate()
  date: Date;
}

export class CreateCourseDto implements Course {
  @IsOptional()
  id: string;

  @IsString()
  @IsNotEmpty()
  readonly courseName: string;

  @IsNumber()
  @IsNotEmpty()
  readonly categoryId: number;

  @IsArray()
  readonly slotsConfig: [SlotConfigDto];

  @IsBoolean()
  @IsNotEmpty()
  readonly isActive: boolean;

  @IsString()
  @IsNotEmpty()
  readonly imageUrl: string;

  @IsOptional()
  readonly duration: string;

  @IsOptional()
  readonly modules: number;

  @IsOptional()
  readonly description: string;
}
