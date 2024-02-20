import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';

import appConfig from "../../utils/app.config"


console.log(process.env.JWT_SECRET)

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: appConfig().jwtSecret,
    });
  }
  async validate(payload: any) {
    return {
      userId: payload.id,
      username: payload.email,
      roles: payload.roles,
    };
  }
}
