import { Body, ClassSerializerInterceptor, Controller, Get, Post, UseInterceptors } from '@nestjs/common';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) { }

  @Get()
  @UseInterceptors(ClassSerializerInterceptor)
    /**
     * serialization -> 직렬화 -> 현재시스템에서 사용되는 데이터 구조를 다른 시스템에서도 쉽게 사용가능 할 수 있는 포맷으로 변환 -> class의 object에서 json 포맷으로 변환
     */
  getUsers() {
    return this.usersService.getAllUsers();
  }
  
  // @Post()
  // postUser(@Body('nickname') nickname: string,
  //   @Body('email') email: string,
  //   @Body('password') password: string) {
  //   return this.usersService.createUser({
  //       nickname, email, password
  //     });
  // }
}
