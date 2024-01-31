import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { UserModule } from 'src/user/user.module';
import { jwtConstants } from './authGuard/constans';
import { AuthGuard } from './authGuard/auth.guard';
import { AuthService } from './services/auth.service';
import { AuthController } from './controller/auth.controller';
import { RolesGuard } from './rolesGuard/roles.guard';

@Module({
  imports: [
    UserModule,
    JwtModule.register({
      global: true,
      secret: jwtConstants.secret,
      signOptions: { expiresIn: '15d' },
    }),
  ],
  controllers: [AuthController],
  providers: [
    AuthService,
    {
      provide: 'APP_GUARD',
      useClass: AuthGuard,
    },
    {
      provide: 'ROLE_GUARD',
      useClass: RolesGuard,
    },
  ],
})
export class AuthModule {}
