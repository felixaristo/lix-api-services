import { Controller, Post, Body, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { BasicAuthGuard } from './guards/basic.guard';
import { JwtAuthGuard } from './guards/jwt.guard';
import { Roles } from 'src/common/decorators/roles.decorator';
import { RolesGuard } from '../common/guards/roles.guard'

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

    @UseGuards(BasicAuthGuard)
    @Post('login')
    login(@Body() body: { username: string; password: string }) {
        return this.authService.login(body.username, body.password);
    }

    @UseGuards(JwtAuthGuard, RolesGuard)
    @Roles('admin')
    @Post('reset_password')
    reset_password(@Body() body: { username: string; password: string }) {
        return this.authService.login(body.username, body.password);
    }
}