import { Module } from "@nestjs/common";
import { CategoryService } from "./category.service";
import { DynamooseModule } from "nestjs-dynamoose";
import { CategorySchema } from "./schema/category.schema";
import { CategoryController } from "./category.controller";

@Module({
  imports: [DynamooseModule.forFeature([{ name: "Category", schema: CategorySchema }])],
  controllers: [CategoryController],
  providers: [CategoryService],
})
export class CategoryModule {}
