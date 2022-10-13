import { Controller, Get, Headers, Param, UseGuards } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { JwtService } from "@nestjs/jwt";
import { AuthGuard } from "@nestjs/passport";
import { JwtAuthGuard } from "src/auth/jwt-auth.guard";
import { User, UserKey } from "./models/user.interface";
import { UsersService } from "./users.service";

@Controller("users")
@UseGuards(JwtAuthGuard)
export class UsersController {
  constructor(
    private userService: UsersService,
    private jwtService: JwtService,
    private configService: ConfigService
  ) {}

  @Get()
  async getUsers(
    @Headers("Authorization") authorization = ""
  ): Promise<User[]> {
    return await this.userService.findAll();
  }

  @Get("id/:id")
  async getUser(@Param("id") id: UserKey): Promise<User> {
    return await this.userService.findOne(id);
  }

  // @UseGuards(JwtAuthGuard, AuthenticatedGuard)
  // @Roles(Role.Admin)

  // @Post(':id')
  // async getTodo(@Param() id: string): Promise<Blog> {
  //   console.log(id);

  //   return await this.appService.getBlog(id);
  // }

  // @Delete(":id")
  // async deleteUser(@Param("id") id: string): Promise<any> {
  //   return await this.userService.deleteUser(id);
  // }

  //Post / Login
  // @UseGuards(LocalAuthGuard)

  // @UseGuards(AuthenticatedGuard)
  // @Get("profile")
  // getProfile(@Req() req: Request) {
  //   console.log("entrou");

  //   return "entrou";
  // }

  // @UseGuards(JwtAuthGuard)
  // @Get("profile")
  // getProfile(@Request() req) {
  //   return req.user;
  // }
}
