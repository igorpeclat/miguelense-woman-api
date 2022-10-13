import { Injectable, NotAcceptableException } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async validateUser(email: string, password: string): Promise<any> {
    const user = await this.usersService.findByParam(
      'email',
      email.toLowerCase(),
    );
    const docUser = user[0];
    if (!docUser) {
      throw new NotAcceptableException('could not find the user');
    }
    const passwordValid = await bcrypt.compare(password, docUser.password);
    if (docUser && passwordValid) {
      return {
        id: docUser.id,
        email: docUser.email,
      };
    }
    return null;
  }

  async login(req: any) {
    const payload = { email: req.email, id: req.id };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}
