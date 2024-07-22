import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
  UseGuards,
} from '@nestjs/common';
import { ProductsService } from './products.service';
import { AuthGuard } from 'src/modules/auth/auth.guard';
import { Product } from './products.entity';
@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @Get()
  getProducts(
    @Query('page') page: string = '1',
    @Query('limit') limit: string = '5',
  ) {
    return this.productsService.getProducts({
      page: parseInt(page),
      limit: parseInt(limit),
    });
  }

  @Get(':id')
  getProduct(@Param('id') id: string) {
    return this.productsService.getProduct(id);
  }

  @Post()
  @UseGuards(AuthGuard)
  createProducts(@Body() products: Product) {
    return this.productsService.createProduct(products);
  }

  @Put(':id')
  @UseGuards(AuthGuard)
  updateProducts(@Param('id') id: string, @Body() product: Product) {
    return this.productsService.updateProduct(id, product);
  }

  @Delete(':id')
  @UseGuards(AuthGuard)
  deleteProducts(@Param('id') id: string) {
    return this.productsService.deleteProduct(id);
  }

  @Post('seeder')
  addProducts(@Body() products: any[]) {
    return this.productsService.addProducts(products);
  }
}
