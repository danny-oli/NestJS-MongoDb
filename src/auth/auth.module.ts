import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';

import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { UsersModule } from '../models/users/users.module';
import { LocalStrategy } from './local.strategy';
import { JwtStrategy } from './jwt.strategy';
import { jwtConstants } from './constants';

@Module({
  imports: [
    UsersModule,
    PassportModule,
    JwtModule.register({
      secret: jwtConstants.secret,
      //Uncoment line below to set a time validation for your Jwt Toek
      // signOptions: { expiresIn: '600s' },
    }),],
  controllers: [
    AuthController,],
  providers: [AuthService, LocalStrategy, JwtStrategy],
})
export class AuthModule { }
