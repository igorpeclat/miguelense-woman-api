import { Injectable } from "@nestjs/common";
import * as bcrypt from "bcrypt";
import { InjectModel, Model } from "nestjs-dynamoose";
import { v4 as uuid } from "uuid";
import { User, UserKey } from "./models/user.interface";

@Injectable()
export class UsersService {
  constructor(
    @InjectModel("User")
    private userModel: Model<User, UserKey>
  ) {}

  async create(user: User) {
    const userObj = {
      id: uuid(),
      isActive: true,
      ...user,
    };
    const saltOrRounds = 10;
    userObj.password = await bcrypt.hash(userObj.password, saltOrRounds);
    return this.userModel.create(userObj);
  }

  update(key: UserKey, user: Partial<User>) {
    return this.userModel.update(key, user);
  }

  findOne(key: UserKey) {
    return this.userModel.get(key);
  }

  async findByParam(key: string, value: string): Promise<User | any> {
    let param = {
      [key]: {
        eq: value,
      },
    };
    return await this.userModel.scan(param).exec();
  }

  findAll() {
    return this.userModel.scan().exec();
  }
}
