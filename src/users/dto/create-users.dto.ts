import {
  IsBoolean, IsEmail, IsEnum,
  IsOptional, IsString, Matches
} from "class-validator";
import { Role } from "../enums/role.enum";
import { User } from "../models/user.interface";

export class CreateUserDto implements User {
  @IsOptional()
  @IsString()
  id: string;

  @IsString()
  readonly fullName: string;

  @IsEmail()
  readonly email: string;

  // @Type(() => Date)
  // @IsDate()
  readonly birthdayDate: string;

  @Matches(/^\d{5}-\d{3}$/)
  @IsString()
  readonly zipCode: string;

  @IsString()
  readonly password: string;

  @IsOptional()
  @IsBoolean()
  isActive: boolean;

  @IsEnum(Role)
  readonly role: Role;
}
