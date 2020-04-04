import { ApiProperty } from '@nestjs/swagger';

export class CourseDto {
  @ApiProperty()
  readonly name: string;
}
