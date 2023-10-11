import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './auth.entity';
import { JwtModule } from '@nestjs/jwt';
import { jwt_config } from 'src/config/jwt.config';
import { JwtAccessTokenStrategy } from 'src/config/jwtAccessToken.strategy';
import { JwtRefreshTokenStrategy } from 'src/config/jwtRefreshToken.strategy';
import { MailModule } from '../mail/mail.module';
import { ResetPassword } from './reset_password.entity';
import { PassportModule } from '@nestjs/passport';

@Module({
  imports: [
    TypeOrmModule.forFeature([User, ResetPassword]),
    PassportModule.register({
      defaultStrategy: 'jwt',
      property: 'user',
      session: false,
    }),
    JwtModule.register({
      // secret: jwt_config.secret,
      // signOptions: {
      //   expiresIn: jwt_config.expired,
      // },
    }),
    MailModule,
  ],
  controllers: [AuthController],
  providers: [AuthService, JwtAccessTokenStrategy, JwtRefreshTokenStrategy],
})
export class AuthModule {}
