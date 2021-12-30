import { Module } from '@nestjs/common';
import { AuthModule } from 'src/auth/auth.module';
import { catsProviders } from 'src/cats/provider/cats.provider';
import { DatabaseModule } from 'src/database/database.module';
import { HumansController } from './humans.controller';
import { HumansService } from './humans.service';
import { humanProvider } from './provider/humans.provider';

@Module({
  imports: [DatabaseModule, AuthModule],
  controllers: [HumansController],
  providers: [HumansService, ...humanProvider, ...catsProviders],
})
export class HumansModule {}
