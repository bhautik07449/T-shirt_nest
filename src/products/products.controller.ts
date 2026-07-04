import { Controller, Get, Post, Patch, Delete, Body, Param, UseGuards } from '@nestjs/common';
import { ProductsService } from './products.service';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { PermissionsGuard } from '../auth/guards/permissions.guard';
import { Permissions } from '../auth/decorators/permissions.decorator';

@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  // Public endpoints
  @Get()
  findAll() {
    return this.productsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.productsService.findOne(id);
  }

  // Protected endpoints (Requires MANAGE_PRODUCTS permission)
  @Post()
  @UseGuards(JwtAuthGuard, PermissionsGuard)
  @Permissions('MANAGE_PRODUCTS')
  create(@Body() createProductDto: any) {
    return this.productsService.create(createProductDto);
  }

  @Patch(':id')
  @UseGuards(JwtAuthGuard, PermissionsGuard)
  @Permissions('MANAGE_PRODUCTS')
  update(@Param('id') id: string, @Body() updateProductDto: any) {
    return this.productsService.update(id, updateProductDto);
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard, PermissionsGuard)
  @Permissions('MANAGE_PRODUCTS')
  delete(@Param('id') id: string) {
    return this.productsService.delete(id);
  }
}
