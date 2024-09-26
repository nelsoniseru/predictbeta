import { Injectable, ConflictException, BadRequestException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { LoginUserDto } from './dto/login.dto';
import * as bcrypt from 'bcrypt';
import { CreateUserDto } from '../auth/dto/register.dto';
import { UsersService } from '../users/users.service';

@Injectable()
export class AuthService {
  constructor(   
 private jwtService: JwtService,
  private readonly usersService: UsersService
  ) {}

  async login(loginUserDto:LoginUserDto) {
    const user = await this.usersService.findByEmail(loginUserDto.email);
    console.log(user);
    if (user && await bcrypt.compare(loginUserDto.password, user.password)) {
        const payload = { email: user.email, sub: user.id };
        return {
          access_token: this.jwtService.sign(payload),
        };
    }
    throw new BadRequestException('Invalid Credentials');
    
  }

  async register(createUserDto:CreateUserDto) {
    const newUser = await this.usersService.createUser(createUserDto);
    return newUser;
  }
}
