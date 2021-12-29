import { Inject, Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Model } from 'mongoose';
import { Strategy } from 'passport-jwt';
import { JwtPayload } from '../interface/jwt-payload.interface';
import { User } from '../interface/user.interface';

@Injectable()
export class AuthStrategy extends PassportStrategy(Strategy) {
  constructor(@Inject('USER_MODEL') private authModel: Model<User>) {
    super({
      jwtFromRequest: (req) => {
        if (!req || !req.cookies) return null;
        console.log(req.cookies);
        return req.cookies['access_token'];
      },
      ignoreExpiration: false,
      secretOrKey: 'SECRET',
    });
  }

  async validate(payload: JwtPayload) {
    const { username } = payload;
    const user = await this.authModel.findOne({ username });

    if (!user) {
      throw new UnauthorizedException('error in jwt strategy');
    }

    return user;
  }
}
