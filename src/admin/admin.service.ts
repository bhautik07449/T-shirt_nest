import { Injectable, ConflictException, NotFoundException } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AdminService {
  constructor(private usersService: UsersService) {}

  async createSubAdmin(createAdminDto: any) {
    const existingUser = await this.usersService.findOneByEmail(createAdminDto.email);
    if (existingUser) {
      throw new ConflictException('Email already exists');
    }

    const hashedPassword = await bcrypt.hash(createAdminDto.password, 10);
    const subAdminData = {
      name: createAdminDto.name,
      email: createAdminDto.email,
      password: hashedPassword,
      role: 'ADMIN',
      permissions: createAdminDto.permissions || [],
    };

    const admin = await this.usersService.create(subAdminData);
    
    return {
      message: 'Sub-Admin successfully created',
      admin: {
        id: (admin as any)._id,
        name: admin.name,
        email: admin.email,
        role: admin.role,
        permissions: admin.permissions,
      }
    };
  }

  async updateSubAdminPermissions(id: string, permissions: string[]) {
    // Only update permissions
    const updated = await this.usersService.update(id, { permissions });
    return {
      message: 'Permissions updated successfully',
      permissions: updated.permissions
    };
  }
}
