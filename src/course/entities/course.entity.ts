import { Entity, PrimaryColumn } from 'typeorm';

@Entity()
export class Course {
  @PrimaryColumn()
  name: string;
}
