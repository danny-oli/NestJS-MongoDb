import { Controller, UseGuards, Request, Post, UseInterceptors, ClassSerializerInterceptor } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LocalAuthGuard } from './local-auth.guard';
@Controller()
export class AuthController {
    constructor(private authService: AuthService) { }

    @UseGuards(LocalAuthGuard)
    @UseInterceptors(ClassSerializerInterceptor) // Not working
    @Post('auth/login')
    async login(@Request() req) {
        return this.authService.login(req.user);
    }
}
