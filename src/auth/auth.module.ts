import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';

import { BasicStrategy } from './strategies/basic.strategy';
import { JwtStrategy } from './strategies/jwt.strategy';
import { JwtModule } from '@nestjs/jwt';

import { PrismaModule } from '../prisma/prisma.module';

@Module({
    imports:[
        PrismaModule,
        JwtModule.register({
            secret: process.env.JWT_SECRET || 'secret123',
            signOptions: { expiresIn: '1d' },
        }),
    ],
    providers: [AuthService, BasicStrategy, JwtStrategy],
    controllers: [AuthController],
})
export class AuthModule {}