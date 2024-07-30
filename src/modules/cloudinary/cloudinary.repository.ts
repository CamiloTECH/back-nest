import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { UploadApiResponse, v2 } from 'cloudinary';
import * as toStream from 'buffer-to-stream';
import { InjectRepository } from '@nestjs/typeorm';
import { Product } from '../products/products.entity';
import { Repository } from 'typeorm';

@Injectable()
export class CloudinaryRepository {
  constructor(
    @InjectRepository(Product) private productsRepository: Repository<Product>,
  ) {}

  async uploadImage(file: Express.Multer.File): Promise<UploadApiResponse> {
    return new Promise((resolve, reject) => {
      const upload = v2.uploader.upload_stream(
        { resource_type: 'auto' },
        (err, res) => {
          err ? reject(err) : resolve(res);
        },
      );
      toStream(file.buffer).pipe(upload);
    });
  }

  async updateImage(file: Express.Multer.File, id: string) {
    const newImage = await this.uploadImage(file);
    if (newImage && newImage.secure_url) {
      const updateProduct = await this.productsRepository.update(
        { id },
        { imgUrl: newImage.secure_url },
      );
      if (updateProduct.affected) {
        return updateProduct;
      }
      throw new NotFoundException('Product not found');
    }
    throw new BadRequestException('Error al cargar la imagen');
  }
}
