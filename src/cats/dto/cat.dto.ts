import { ApiProperty } from '@nestjs/swagger';

export class CreateCatDTO {
  @ApiProperty({
    type: String,
    description: 'The name of the cat',
    default: '',
  })
  name: string;
  @ApiProperty({
    type: Number,
    description: 'The age of the cat',
    default: 1,
  })
  readonly age: number;
  @ApiProperty({
    type: String,
    description: 'The breed of the cat',
    default: '',
  })
  breed: string;
}
