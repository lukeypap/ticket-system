import { RolesGuard } from './guards/roles.guard';
import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { userProviders } from 'src/user/providers/user.providers';
import { DatabaseModule } from 'src/database/database.module';
import { JwtModule } from '@nestjs/jwt';
import { JwtGuard } from './guards/jwt.guard';
import { JwtStrategy } from './guards/jwt.strategy';
import { PassportModule } from '@nestjs/passport';
import { UserService } from 'src/user/service/user.service';

@Module({
  imports: [
    DatabaseModule,
    JwtModule.registerAsync({
      useFactory: () => ({
        secret: process.env.JWT_SECRET,
        signOptions: { expiresIn: '7200s' },
      }),
    }),
    PassportModule,
  ],
  controllers: [AuthController],
  providers: [
    ...userProviders,
    AuthService,
    JwtGuard,
    JwtStrategy,
    UserService,
    RolesGuard,
  ],
})
export class AuthModule {}
