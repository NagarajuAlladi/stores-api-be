import { ApiProperty, PartialType } from '@nestjs/swagger';
import { CreateHumanDto } from './create-human.dto';

export class UpdateHumanDto extends PartialType(CreateHumanDto) {
  @ApiProperty({
    type: String,
    description: 'Cats Id',
    default: '',
  })
  catsId;

  @ApiProperty({
    type: String,
    description: 'Human Name',
    default: '',
  })
  name: string;

  @ApiProperty({
    type: String,
    description: 'Human Gender',
    default: '',
  })
  gender: string;

  @ApiProperty({
    type: Number,
    description: 'Cats Count',
    default: '',
  })
  catsCount: Number;
}
