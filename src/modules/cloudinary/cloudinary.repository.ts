import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { UploadApiResponse, v2 } from 'cloudinary';
import * as toStream from 'buffer-to-stream';
import { InjectRepository } from '@nestjs/typeorm';
import { Product } from '../../entities/products.entity';
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
    const findUser = await this.productsRepository.findOne({ where: { id } });
    if (!findUser) {
      throw new NotFoundException('Product not found');
    }

    const newImage = await this.uploadImage(file);
    if (!newImage || !newImage.secure_url) {
      throw new BadRequestException('Error loading image');
    }
    return this.productsRepository.update(
      { id },
      { imgUrl: newImage.secure_url },
    );
  }
}
