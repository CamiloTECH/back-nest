import { Injectable } from '@nestjs/common';

import { CloudinaryRepository } from './cloudinary.repository';

@Injectable()
export class CloudinaryService {
  constructor(private cloudinaryRepository: CloudinaryRepository) {}

  uploadImage(file: Express.Multer.File, id: string) {
    return this.cloudinaryRepository.updateImage(file, id);
  }
}
