import { ApiProperty } from '@nestjs/swagger';

export class CreateHumanDto {
  @ApiProperty({
    type: String,
    description: 'Human Name',
    default: '',
  })
  name: String;

  @ApiProperty({
    type: String,
    description: 'Human Gender',
    default: '',
  })
  gender: String;

  @ApiProperty({
    type: Number,
    description: 'Cats Count',
    default: '',
  })
  catsCount: Number;
}
