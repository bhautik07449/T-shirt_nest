import { Controller, Get, Patch, Delete, Body, UseGuards, Request } from '@nestjs/common';
import { UsersService } from './users.service';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @UseGuards(JwtAuthGuard)
  @Get('profile')
  getProfile(@Request() req: any) {
    // req.user is populated by the JwtStrategy
    return this.usersService.findById(req.user.userId);
  }

  @UseGuards(JwtAuthGuard)
  @Patch('profile')
  updateProfile(@Request() req: any, @Body() updateUserDto: any) {
    return this.usersService.update(req.user.userId, updateUserDto);
  }

  @UseGuards(JwtAuthGuard)
  @Delete('profile')
  deleteProfile(@Request() req: any) {
    return this.usersService.delete(req.user.userId);
  }
}
