import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import PassportHttp from 'passport-http';
import { AuthService } from '../auth.service';

const BasicStrategies = PassportHttp.BasicStrategy;

@Injectable()
export class BasicStrategy extends PassportStrategy(BasicStrategies) {
  constructor(private authService: AuthService) {
    super(); // otomatis handle header Authorization Basic
  }

  async validate(username: string, password: string): Promise<any> {
    const user = await this.authService.validateBasic(username, password);
    if (!user) throw new UnauthorizedException();
    return user;
  }
}