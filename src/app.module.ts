import { Module } from '@nestjs/common';
import { CatsModule } from './cats/cats.module';
import { AuthController } from './auth/auth.controller';
import { AuthModule } from './auth/auth.module';
import { HumansModule } from './humans/humans.module';

@Module({
  imports: [CatsModule, HumansModule],
})
export class AppModule {}
