import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Put,
  UseGuards,
} from "@nestjs/common";
import { JwtAuthGuard } from "src/auth/jwt-auth.guard";
import { CategoryService } from "./category.service";
import { CreateCategoryDto } from "./dto/create-category.dto";
import { Category } from "./models/category.interface";

@Controller("category")
export class CategoryController {
  constructor(private categoryService: CategoryService) {}

  @UseGuards(JwtAuthGuard)
  @Get()
  async getCategory(): Promise<Category[]> {
    return await this.categoryService.findAll();
  }

  @UseGuards(JwtAuthGuard)
  @Post()
  async create(@Body() categoryDto: CreateCategoryDto): Promise<Category> {
    return await this.categoryService.create(categoryDto);
  }

  @UseGuards(JwtAuthGuard)
  @Put(":id")
  async update(
    @Param() id: string,
    @Body() categoryDto: CreateCategoryDto
  ): Promise<Category> {
    const categoryKey = { id: id };
    return await this.categoryService.update(categoryKey, categoryDto);
  }
}
