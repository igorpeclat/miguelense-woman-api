import {
  IsBoolean, IsOptional, IsString
} from "class-validator";
import { Category } from "../models/category.interface";

export class CreateCategoryDto implements Category {
  @IsOptional()
  @IsString()
  id: string;
  @IsString()
  name: string;
  @IsString()
  imageUrl: string;
  @IsBoolean()
  isActive: boolean;
}
