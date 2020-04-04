import { Document } from 'mongoose';
import { ApiProperty } from '@nestjs/swagger';

export interface Video extends Document {
  readonly url: string;
  readonly videoName: string;
  readonly uploader: string;
  readonly course: string;
}

export class CreateVideoDto {
  @ApiProperty()
  readonly url: string;

  @ApiProperty()
  readonly videoName: string;

  @ApiProperty()
  readonly uploader: string;

  @ApiProperty()
  readonly course: string;
}
