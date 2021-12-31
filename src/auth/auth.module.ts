import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { CaslModule } from 'src/casl/casl.module';
import { DatabaseModule } from 'src/database/database.module';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { authProviders } from './provider/auth.provider';
import { JwtStrategy } from './strategy/jwt.strategy';
import { UserRepository } from './user.repository';

@Module({
  imports: [
    PassportModule.register({ defaultStrategy: 'jwt' }),
    JwtModule.register({
      secret: 'abcdefghijklmnopsdsdbsb',
      signOptions: {
        expiresIn: 60000,
      },
    }),
    DatabaseModule,
    CaslModule,
  ],
  controllers: [AuthController],
  providers: [...authProviders, AuthService, UserRepository, JwtStrategy],
  exports: [JwtStrategy, PassportModule],
})
export class AuthModule {}
