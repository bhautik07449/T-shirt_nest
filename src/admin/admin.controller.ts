import { Controller, Post, Patch, Body, Param, UseGuards, Get } from '@nestjs/common';
import { AdminService } from './admin.service';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import { Roles } from '../auth/decorators/roles.decorator';

@Controller('admin')
@UseGuards(JwtAuthGuard, RolesGuard)
@Roles('SUPER_ADMIN')
export class AdminController {
  constructor(private readonly adminService: AdminService) {}

  @Post('sub-admins')
  createSubAdmin(@Body() createAdminDto: any) {
    return this.adminService.createSubAdmin(createAdminDto);
  }

  @Patch('sub-admins/:id/permissions')
  updatePermissions(@Param('id') id: string, @Body() updateData: any) {
    return this.adminService.updateSubAdminPermissions(id, updateData.permissions);
  }
}
