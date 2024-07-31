import {
  Controller,
  FileTypeValidator,
  MaxFileSizeValidator,
  Param,
  ParseFilePipe,
  ParseUUIDPipe,
  Post,
  UploadedFile,
  UseGuards,
  UseInterceptors,
  UsePipes,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { MinSizeValidatorPipe } from '../../pipes/minSizeValidator.pipe';
import { CloudinaryService } from './cloudinary.service';
import { AuthGuard } from '../auth/auth.guard';

@Controller('cloudinary')
export class CloudinaryController {
  constructor(private readonly cloudinaryService: CloudinaryService) {}

  @Post('uploadImage/:id')
  @UseGuards(AuthGuard)
  @UseInterceptors(FileInterceptor('image'))
  @UsePipes(MinSizeValidatorPipe)
  uploadImage(
    @UploadedFile(
      new ParseFilePipe({
        validators: [
          new MaxFileSizeValidator({
            maxSize: 200000,
            message: 'El archivo debe ser menor a 200kb',
          }),
          new FileTypeValidator({ fileType: /(jpg|jpeg|png|webp)/ }),
        ],
      }),
    )
    file: Express.Multer.File,
    @Param('id', ParseUUIDPipe) id: string,
  ) {
    return this.cloudinaryService.uploadImage(file, id);
  }
}
