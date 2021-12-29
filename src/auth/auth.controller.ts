import {
  Body,
  Controller,
  Get,
  Post,
  Res,
  ValidationPipe,
} from '@nestjs/common';
import {
  ApiCreatedResponse,
  ApiForbiddenResponse,
  ApiOkResponse,
  ApiTags,
} from '@nestjs/swagger';
import { AuthService } from './auth.service';
import { JwtService } from '@nestjs/jwt';
import { AuthCredentials } from './dto/auth-credential.dto';
import { CreateAuthDto } from './dto/create-auth.dto';
import { User } from './interface/user.interface';
import { Response } from 'express';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private jwtService: JwtService,
  ) {}

  @Post('signup')
  @ApiCreatedResponse({ description: 'this response has created successfully' })
  @ApiForbiddenResponse({ description: 'Forbidden' })
  signUp(
    @Body(new ValidationPipe()) authCredintials: CreateAuthDto,
  ): Promise<User> {
    return this.authService.signUp(authCredintials);
  }

  @Post('/signin')
  @ApiOkResponse({ description: 'The resource has been successfully returned' })
  @ApiForbiddenResponse({ description: 'Invalid credintials' })
  async signin(
    @Body(ValidationPipe) authCredintials: AuthCredentials,
    @Res() response: Response,
  ): Promise<string> {
    const token = await this.authService.signIn(authCredintials);

    response
      .cookie('access_token', token, {
        httpOnly: true,
        // domain: 'localhost', // your domain here!
        expires: new Date(Date.now() + 1000 * 60 * 60 * 24),
      })
      .send(token);

    return token;
  }
}
