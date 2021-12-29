import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { DatabaseModule } from 'src/database/database.module';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { authProviders } from './provider/auth.provider';
import { AuthStrategy } from './strategy/auth.strategy';
import { UserRepository } from './user.repository';

@Module({
  imports: [
    PassportModule.register({ defaultStrategy: 'jwt' }),
    JwtModule.register({
      secret: 'SECRET',
      signOptions: {
        expiresIn: 60000,
      },
    }),
    DatabaseModule,
  ],
  controllers: [AuthController],
  providers: [...authProviders, AuthService, UserRepository, AuthStrategy],
  exports: [PassportModule],
})
export class AuthModule {}
