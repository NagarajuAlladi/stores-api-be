import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import {
  ApiCreatedResponse,
  ApiForbiddenResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiTags,
} from '@nestjs/swagger';
import { CreateHumanDto } from './dto/create-human.dto';
import { UpdateHumanDto } from './dto/update-human.dto';
import { GetFilterDto } from './filters/get-filters.dto';
import { HumansService } from './humans.service';
import { Human } from './interface/room.interface';

@ApiTags('humans')
@Controller('humans')
export class HumansController {
  constructor(private readonly humanService: HumansService) {}

  @Post(':id')
  @ApiCreatedResponse({ description: 'this response has created successfully' })
  @ApiForbiddenResponse({ description: 'Forbidden' })
  create(
    @Param('id') id: string,
    @Body() createHumanDto: CreateHumanDto,
  ): Promise<Human> {
    return this.humanService.create(id, createHumanDto);
  }

  @Get()
  @ApiOkResponse({
    description: 'The resource list has been successfully returned',
  })
  @ApiForbiddenResponse({ description: 'Forbidden' })
  findOne(@Query() { id, catId }: GetFilterDto) {
    if (id || catId) {
      return this.humanService.find(id, catId);
    } else {
      return this.humanService.findAll();
    }
  }

  @Patch(':id')
  @ApiCreatedResponse({
    description: 'The resource has been updated successfully',
  })
  @ApiForbiddenResponse({ description: 'Forbidden' })
  @ApiNotFoundResponse({ description: 'Not found' })
  update(
    @Param('id') id: string,
    @Body() updateHumanDto: UpdateHumanDto,
  ): Promise<Human> {
    return this.humanService.update(id, updateHumanDto);
  }

  @Delete(':id')
  @ApiOkResponse({ description: 'The resource has been successfully deleted' })
  @ApiForbiddenResponse({ description: 'Forbidden' })
  @ApiNotFoundResponse({ description: 'Not found' })
  remove(@Param('id') id: string): Promise<Human> {
    return this.humanService.remove(id);
  }
}
