import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService
  ) {}

  async register(createUserDto: any) {
    const hashedPassword = await bcrypt.hash(createUserDto.password, 10);
    const user = await this.usersService.create({
      ...createUserDto,
      password: hashedPassword,
    });
    
    return {
      message: 'User successfully registered',
      user: {
        id: (user as any)._id,
        name: user.name,
        email: user.email,
      }
    };
  }

  async login(loginDto: any) {
    const user = await this.usersService.findOneByEmail(loginDto.email);
    if (!user) {
      throw new UnauthorizedException('Invalid credentials');
    }
    
    const isPasswordValid = await bcrypt.compare(loginDto.password, user.password as string);
    if (!isPasswordValid) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const payload = { 
      email: user.email, 
      sub: user._id,
      role: user.role,
      permissions: user.permissions 
    };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}
