import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';
import { Types } from 'mongoose';

type JWTPayload = {
    sub: Types.ObjectId
    nickname: string
}

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: process.env.JWT_SECRET_TOKEN,
    });
  }

  async validate(payload: JWTPayload) {
    return { userId: payload.sub, username: payload.nickname };
  }
}