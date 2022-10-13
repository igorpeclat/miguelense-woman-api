import { Module } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { DynamooseModule } from 'nestjs-dynamoose';
import { UserSchema } from './schema/user.schema';
import { UsersController } from './user.controller';
import { UsersService } from './users.service';

@Module({
  imports: [DynamooseModule.forFeature([{ name: "User", schema: UserSchema }])],
  providers: [UsersService, JwtService],
  controllers: [UsersController],
  exports: [UsersService],
})
export class UsersModule {}