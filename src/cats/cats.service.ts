import {
  BadRequestException,
  ForbiddenException,
  Inject,
  Injectable,
} from '@nestjs/common';
import { Model } from 'mongoose';
import { CreateCatDTO } from './dto/cat.dto';
import { UpdateCatDTO } from './dto/update-hotel.dto';
import { GetFilterDto } from './filters/get-filter.dto';
import { Cat } from './interface/cats.interface';

@Injectable()
export class CatsService {
  constructor(@Inject('CAT_MODEL') private catModel: Model<Cat>) {}

  async create(createCatDto: CreateCatDTO): Promise<Cat> {
    // try {
    const createdCat = new this.catModel(createCatDto);
    await createdCat.save();
    return createdCat;
    // } catch (error) {
    //   throw new ForbiddenException({ message: error.message });
    // }
  }

  async findAll(): Promise<Cat[]> {
    try {
      return this.catModel.find({});
    } catch (error) {
      throw new BadRequestException();
    }
  }

  async find(filterDto: GetFilterDto): Promise<Cat> {
    try {
      return this.catModel.findById({ _id: filterDto });
    } catch (error) {
      throw new BadRequestException();
    }
  }

  async update(id: string, updateCatDto: UpdateCatDTO): Promise<Cat> {
    try {
      return this.catModel.findByIdAndUpdate({ _id: id }, updateCatDto, {
        new: true,
      });
    } catch (error) {
      throw new ForbiddenException();
    }
  }

  async remove(id: string): Promise<Cat> {
    try {
      return this.catModel.findByIdAndDelete({ _id: id });
    } catch (error) {
      throw new ForbiddenException();
    }
  }
}
