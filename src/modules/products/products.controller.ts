import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseUUIDPipe,
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
    const parsePage = parseInt(page);
    const parseLimit = parseInt(limit);
    return this.productsService.getProducts({
      page: parsePage,
      limit: parseLimit,
    });
  }

  @Get(':id')
  getProduct(@Param('id', ParseUUIDPipe) id: string) {
    return this.productsService.getProduct(id);
  }

  @Post()
  @UseGuards(AuthGuard)
  createProducts(@Body() products: Product) {
    return this.productsService.createProduct(products);
  }

  @Put(':id')
  @UseGuards(AuthGuard)
  updateProducts(@Param('id', ParseUUIDPipe) id: string, @Body() product: any) {
    console.log({ product, id });

    return this.productsService.updateProduct(id, product);
  }

  @Delete(':id')
  @UseGuards(AuthGuard)
  deleteProducts(@Param('id', ParseUUIDPipe) id: string) {
    return this.productsService.deleteProduct(id);
  }

  @Post('seeder')
  addProducts(@Body() products: any[]) {
    return this.productsService.addProducts(products);
  }
}
