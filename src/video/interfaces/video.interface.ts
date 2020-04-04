import { Document } from 'mongoose';

export interface Video extends Document {
  readonly url: string;
  readonly videoName: string;
  readonly uploader: string;
  readonly course: string;
}

export class CreateVideoDto {
  readonly url: string;
  readonly videoName: string;
  readonly uploader: string;
  course: string;
}
