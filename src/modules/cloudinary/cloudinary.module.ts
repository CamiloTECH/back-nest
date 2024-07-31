import { Module } from '@nestjs/common';
import { CloudinaryController } from './cloudinary.controller';
import { CloudinaryService } from './cloudinary.service';
import { CloudinaryConfig } from '../../config/cloudinary';
import { CloudinaryRepository } from './cloudinary.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Product } from '../products/products.entity';

@Module({
  controllers: [CloudinaryController],
  providers: [CloudinaryService, CloudinaryConfig, CloudinaryRepository],
  imports: [TypeOrmModule.forFeature([Product])],
})
export class CloudinaryModule {}
