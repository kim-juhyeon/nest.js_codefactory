import { Body, Controller, Post, Headers, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { MaxLengthPipe, MinLengthPipe, PasswordPipe } from './pipe/password.pipe';
import { BasicTokenGuard } from './guard/basic-token.guard';
import { AccessTokenGuard, RefreshTokenGuard } from './guard/bearer-token.guard';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {

  }
  @Post('token/access')
    @UseGuards(RefreshTokenGuard)
   postTokenAccess(@Headers('authorization') rawToken: string) {
    const token =  this.authService.extractTokenFromHeader(rawToken, true);

    /**
     * {accessToken: {token}}
     */
    const newToken = this.authService.ratateToken(token, false);

    return {
      accessToken: newToken,
    }
  }
  @Post('token/refresh')
    @UseGuards(RefreshTokenGuard)
   postTokenRefresh(@Headers('authorization') rawToken: string) {
    const token =  this.authService.extractTokenFromHeader(rawToken, true);

    /**
     * {accessToken: {token}}
     */
    const newToken = this.authService.ratateToken(token, true);

    return {
      refreshToken: newToken,
    }
  }

  @Post('login/email')
    @UseGuards(BasicTokenGuard)
  postloginEmail(
    @Headers('authorization') rawToken: string,
  ) {
    // email:password -> base64
    const token = this.authService.extractTokenFromHeader(rawToken, false);
    
    const credentials = this.authService.decodeBasicToken(token);

    return this.authService.loginWithEmail(credentials);
  }
  
  @Post('register/email')
  postregisterEmail(@Body('nickname') nickname: string,
    @Body('email') email: string,
    @Body('password',new MaxLengthPipe(8), new MinLengthPipe(3)) password: string) {
    return this.authService.registerWithEmail({
      nickname,
      email,
      password,
    });
    }
}
