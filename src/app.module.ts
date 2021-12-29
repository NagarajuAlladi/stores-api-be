import { Module } from '@nestjs/common';
import { CatsModule } from './cats/cats.module';
import { AuthController } from './auth/auth.controller';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [CatsModule],
})
export class AppModule {}
