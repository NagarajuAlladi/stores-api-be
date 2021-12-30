import {
  BadRequestException,
  ForbiddenException,
  Inject,
  Injectable,
} from '@nestjs/common';
import { Model } from 'mongoose';
import { Cat } from 'src/cats/interface/cats.interface';
import { CreateHumanDto } from './dto/create-human.dto';
import { UpdateHumanDto } from './dto/update-human.dto';
import { Human } from './interface/room.interface';

@Injectable()
export class HumansService {
  constructor(
    @Inject('HUMAN_MODEL') private readonly humanModel: Model<Human>,
    @Inject('CAT_MODEL') private readonly catModel: Model<Cat>,
  ) {}

  async create(id: string, createHumanDto: CreateHumanDto): Promise<Human> {
    try {
      const newHuman = new this.humanModel(createHumanDto);
      newHuman.catId = id;
      await newHuman.save();
      return newHuman;
    } catch (error) {
      throw new ForbiddenException();
    }
  }

  async findAll(): Promise<Human[]> {
    try {
      return this.humanModel.find({});
    } catch (error) {
      throw new BadRequestException();
    }
  }

  async find(id, catId) {
    try {
      if (id && catId === undefined) {
        return this.humanModel.findById({ _id: id });
      } else if (catId && id === undefined) {
        return this.humanModel.find({ catId: catId });
      }
    } catch (error) {
      throw new BadRequestException();
    }
  }

  async update(id: string, updateHumanDto: UpdateHumanDto): Promise<Human> {
    try {
      return this.humanModel.findByIdAndUpdate({ _id: id }, updateHumanDto, {
        new: true,
      });
    } catch (error) {
      throw new ForbiddenException();
    }
  }

  async remove(id: string): Promise<Human> {
    try {
      return this.humanModel.findOneAndDelete({ _id: id });
    } catch (error) {
      throw new ForbiddenException();
    }
  }
}
