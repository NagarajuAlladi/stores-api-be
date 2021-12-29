import { ApiProperty, PartialType } from '@nestjs/swagger';
import { CreateCatDTO } from './cat.dto';

export class UpdateCatDTO extends PartialType(CreateCatDTO) {
  @ApiProperty({
    type: String,
    description: 'The name of the cat',
    default: '',
  })
  readonly name: string;
  @ApiProperty({
    type: Number,
    description: 'The age of the cat',
    default: '',
  })
  readonly age: number;
  @ApiProperty({
    type: String,
    description: 'The breed of the cat',
    default: '',
  })
  readonly breed: string;
}
