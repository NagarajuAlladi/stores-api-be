import { Module } from '@nestjs/common';
import { AuthModule } from 'src/auth/auth.module';
import { DatabaseModule } from 'src/database/database.module';
import { CatsController } from './cats.controller';
import { CatsService } from './cats.service';
import { catsProviders } from './provider/cats.provider';

@Module({
  imports: [AuthModule, DatabaseModule],
  controllers: [CatsController],
  providers: [...catsProviders, CatsService],
})
export class CatsModule {}
