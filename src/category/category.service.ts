import { Injectable } from "@nestjs/common";
import { InjectModel, Model } from "nestjs-dynamoose";
import { v4 as uuid } from "uuid";
import { CreateCategoryDto } from "./dto/create-category.dto";
import { Category, CategoryKey } from "./models/category.interface";

@Injectable()
export class CategoryService {
  constructor(
    @InjectModel("Category")
    private categoryModel: Model<Category, CategoryKey>
  ) {}

  async create(category: CreateCategoryDto) {
    category.id = uuid();
    return this.categoryModel.create(category);
  }

  async update(key: CategoryKey, user: Partial<Category>) {
    return this.categoryModel.update(key, user);
  }

  // findOne(key: CategoryKey) {
  //   return this.userModel.get(key);
  // }

  // async findByParam(key: string, value: string): Promise<User | any> {
  //   let param = {
  //     [key]: {
  //       eq: value,
  //     },
  //   };
  //   console.log(param);

  //   return await this.userModel.scan(param).exec();
  // }

  findAll() {
    return this.categoryModel.scan().exec();
  }
}
