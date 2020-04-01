import { Document } from 'mongoose';

export interface Video extends Document {
  readonly name: string;
  readonly user: string;
  readonly course: string;
}

export class CreateVideoDto {
  readonly name: string;
  readonly user: string;
  readonly course: string;
}
